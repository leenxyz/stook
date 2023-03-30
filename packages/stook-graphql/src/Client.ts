import { useState, useEffect, useRef, useCallback } from 'react'
import { useStore, Storage, mutate } from 'stook'
import compose from 'koa-compose'
import { produce } from 'immer'
import { GraphQLClient } from '@boter/graphql-client'
import { createClient, Client as SubscriptionClient } from 'graphql-ws'
import isEqual from 'react-fast-compare'

import { fetcher } from './fetcher'
import {
  Options,
  RefetchOptions,
  QueryResult,
  FetcherItem,
  Middleware,
  GraphqlOptions,
  MutateResult,
  Variables,
  SubscribeResult,
  SubscriptionOption,
  Start,
} from './types'
import {
  getDeps,
  getVariables,
  getDepsMaps,
  useUnmounted,
  useUnmount,
  isResolve,
  getOperationName,
} from './utils'

interface VarCurrent {
  value: any
  resolve: boolean
}

interface DepsCurrent {
  value: any
  resolve: boolean
}

const NULL_AS: any = null

export class Context {
  constructor(public input: string) {}
  headers: Record<string, string> = {}
  body: any = undefined
  valid: boolean = true
}

export class Client {
  graphqlOptions: GraphqlOptions
  middleware: Middleware[] = []

  graphqlClient: GraphQLClient = NULL_AS
  subscriptionClient: SubscriptionClient = NULL_AS

  constructor(opt: GraphqlOptions = { endpoint: '/graphql', headers: {} }) {
    const { endpoint, headers } = opt
    this.graphqlOptions = opt
    this.graphqlClient = new GraphQLClient(endpoint, {
      headers,
    } as any)
  }

  config = (opt: GraphqlOptions = { endpoint: '/graphql', headers: {} }) => {
    this.graphqlOptions = { ...this.graphqlOptions, ...opt }

    const { endpoint, headers, subscriptionsEndpoint } = opt
    this.graphqlClient = new GraphQLClient(endpoint, { headers } as any)

    // fix ssr bug
    if (subscriptionsEndpoint && typeof window !== 'undefined') {
      this.subscriptionClient = createClient({
        url: subscriptionsEndpoint,
        // keepAlive:
      })

      // this.subscriptionClient.on('ping', () => {
      //   //
      // })
    }
  }

  applyMiddleware = (fn: Middleware) => {
    this.middleware.push(fn)
  }

  query = async <T = any>(input: string, options: Options = {}): Promise<T> => {
    const context = new Context(input)
    const { variables = {}, endpoint } = options

    const opt: any = {}
    if (options.headers) {
      opt.headers = options.headers
    }

    const action = async (ctx: Context) => {
      const queryOpt = {
        ...opt,
        headers: { ...(opt.headers || {}), ...(ctx.headers || {}) },
      }
      if (endpoint) queryOpt.endpoint = endpoint
      try {
        ctx.body = await this.graphqlClient.query<T>(input, variables, queryOpt)
      } catch (error) {
        ctx.body = error
        ctx.valid = false
      }
    }

    // TODO: get req headers
    await compose([...this.middleware])(context)

    // call requerst
    await compose([...this.middleware, action])(context)

    if (!context.valid) {
      throw context.body
    }
    return context.body as T
  }

  useQuery = <T = any, V = Variables>(input: string, options: Options<T, V> = {}) => {
    const isUnmouted = useUnmounted()
    const { initialData: data, onUpdate, lazy = false, pollInterval } = options
    const fetcherName = options.key || input

    const initialState = { loading: true, data } as QueryResult<T>
    const deps = getDeps(options)
    const [result, setState] = useStore(fetcherName, initialState)

    //是否应该立刻开始发送请求
    const [shouldStart, setShouldStart] = useState(!lazy)

    const isMounted = useRef(false)
    useEffect(() => {
      isMounted.current = true
    }, [])

    const update = (nextState: QueryResult<T>, isRefetch = false) => {
      if (isMounted.current) {
        if (isRefetch) {
          mutate(fetcherName, nextState)
        } else {
          setState(nextState)
        }
        onUpdate && onUpdate(nextState)
      }
    }

    const makeFetch = async (opt: RefetchOptions<T, V> = {}, _ = false): Promise<any> => {
      const key = opt.key ?? fetcherName
      try {
        if (fetcher.get(key)) fetcher.get(key).called = true

        const resData = await this.query<T>(input, (opt as any) || {})

        const nextState = produce(result, (draft: any) => {
          draft.loading = false
          if (opt.setData && typeof opt.setData === 'function') {
            opt.setData(draft.data, resData)
          } else {
            draft.data = resData
          }
        })

        update(nextState, true)
        return resData
      } catch (error) {
        update({ loading: false, error } as QueryResult<T>, true)
        // throw error
      }
    }

    /**
     *
     * @param opt
     * @return 返回类型为 data，也就是 T
     */
    const refetch = async (opt: RefetchOptions<T, V> = {}): Promise<T> => {
      const key = opt.key ?? fetcherName
      let showLoading = true
      if (typeof opt.showLoading === 'boolean' && opt.showLoading === false) {
        showLoading = false
      }

      if (showLoading && isMounted.current) {
        update({ loading: true } as QueryResult<T>)
      }

      function getRefetchVariables(opt: RefetchOptions<T, V> = {}): any {
        const fetcherVariables: any = fetcher.get(key).variables

        // TODO: handle any
        const variables: any = opt.variables
        if (!variables) {
          return fetcherVariables || {}
        }

        if (typeof variables === 'function') {
          return variables(fetcherVariables)
        }
        return opt.variables
      }

      opt.variables = getRefetchVariables(opt)

      // store variables to fetcher
      fetcher.get(key).variables = opt.variables || {}

      const data: T = (await makeFetch(opt, true)) as any
      return data
    }

    // TODO: 要确保 variable resolve
    const start: Start = (): any => {
      setShouldStart(true)
    }

    /**
     * handle variable
     */
    const variables = getVariables(options)
    const varRef = useRef<VarCurrent>({
      value: getVariables(options),
      resolve: isResolve(options.variables),
    })

    if (!varRef.current.resolve && getVariables(options)) {
      varRef.current = { value: variables, resolve: true }
    }

    // 轮询
    const timerRef = useRef<any>()

    useEffect(() => {
      // store refetch fn to fetcher
      if (!fetcher.get(fetcherName)) {
        fetcher.set(fetcherName, { refetch, called: false } as FetcherItem<T>)
      }

      // if resolve, 说明已经拿到最终的 variables
      const shouldFetch =
        varRef.current.resolve && !fetcher.get(fetcherName).called && !isUnmouted() && shouldStart

      if (shouldFetch) {
        // store variables to fetcher
        fetcher.get(fetcherName).variables = varRef.current.value

        // make http request
        makeFetch({ ...options, variables: varRef.current.value })

        if (pollInterval && !fetcher.get(fetcherName).polled) {
          fetcher.get(fetcherName).polled = true
          /** pollInterval */

          timerRef.current = setInterval(() => {
            makeFetch({ ...options, variables: varRef.current.value })
          }, pollInterval)
        }
      }
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          fetcher.get(fetcherName).polled = false
        }
      }

      // eslint-disable-next-line
    }, [varRef.current, shouldStart])

    /**
     * handle deps
     */
    const depsMaps = getDepsMaps(deps)
    const depsRef = useRef<DepsCurrent>({ value: depsMaps, resolve: false })

    if (!isEqual(depsRef.current.value, depsMaps)) {
      depsRef.current = { value: depsMaps, resolve: true }
    }

    useEffect(() => {
      if (depsRef.current.resolve) {
        update({ loading: true } as QueryResult<T>)
        makeFetch({ ...options, variables: varRef.current.value })
      }
      // eslint-disable-next-line
    }, [depsRef.current])

    /** pollInterval */
    useEffect(() => {
      if (pollInterval && !fetcher.get(fetcherName).polled) {
        fetcher.get(fetcherName).polled = true
        const timer = setInterval(() => {
          makeFetch({ ...options, variables: varRef.current.value })
        }, pollInterval)

        return () => {
          clearInterval(timer)
        }
      }
      return () => {}
    }, [])

    // when unmount
    useUnmount(() => {
      // 全部 unmount，设置 called false
      const store = Storage.get(fetcherName)

      // 对应的 hooks 全部都 unmount 了
      if (store && store.setters.length === 0) {
        // 重新设置为 false，以便后续调用刷新
        fetcher.get(fetcherName).called = false

        // TODO: 要为true ? 还是 undefined 好

        update({ loading: true } as any)
      }
    })

    const called = fetcher.get(fetcherName) && fetcher.get(fetcherName).called

    return { ...result, refetch, start, called }
  }

  useMutation = <T = any, V = Variables>(input: string, options: Options = {}) => {
    const { initialData: data, onUpdate } = options
    const initialState = { data, called: false } as MutateResult<T>
    const fetcherName = options.key || input
    const [result, setState] = useStore<MutateResult<T>>(fetcherName, initialState)

    const update = (nextState: MutateResult<T>) => {
      setState(nextState)
      onUpdate && onUpdate(nextState)
    }

    const makeFetch = async (opt: Options = {}): Promise<any> => {
      try {
        const data = await this.query<T>(input, { ...options, ...opt })
        update({ loading: false, called: true, data } as unknown as MutateResult<T>)
        return data
      } catch (error) {
        update({ loading: false, called: true, error } as unknown as MutateResult<T>)
        // throw error
      }
    }

    const mutate = async (variables: V, opt: Options = {}): Promise<T> => {
      update({ loading: true } as MutateResult<T>)
      return (await makeFetch({ ...opt, variables } as any)) as T
    }

    return [mutate, result] as [(variables: V, opt?: Options) => Promise<T>, MutateResult<T>]
  }

  useSubscription = <T = any>(input: string, options: SubscriptionOption<T> = {}) => {
    const { variables = {}, operationName = '', initialQuery = '', onUpdate } = options

    const isMounted = useIsMounted()

    const initialState = { loading: true } as SubscribeResult<T>
    const [result, setState] = useState(initialState)

    const context = new Context(input)

    let unsubscribe: () => void = null as any

    function update(nextState: SubscribeResult<T>) {
      setState(nextState)
      onUpdate && onUpdate(nextState)
    }

    function updateInitialQuery(nextState: SubscribeResult<T>) {
      setState(nextState)
      if (options.initialQuery && options.initialQuery.onUpdate) {
        options.initialQuery.onUpdate(nextState)
      }
    }

    const initQuery = async () => {
      if (!initialQuery) return
      if (!isMounted()) return

      try {
        let data = await this.query<T>(initialQuery.query, {
          variables: initialQuery.variables || {},
        })
        updateInitialQuery({ loading: false, data } as unknown as SubscribeResult<T>)
        return data
      } catch (error) {
        updateInitialQuery({ loading: false, error } as unknown as SubscribeResult<T>)
        return error
      }
    }

    const initSubscribe = async () => {
      if (!isMounted()) return

      unsubscribe = this.subscriptionClient.subscribe(
        {
          query: input,
          variables: variables as any,
          operationName: getOperationName(input) || operationName,
        },
        {
          next: ({ data }) => {
            const action = async (ctx: Context) => {
              ctx.body = data
            }
            compose([...this.middleware, action])(context).then(() => {
              update({ loading: false, data: context.body } as SubscribeResult<T>)
            })
          },
          error: (error) => {
            const action = async (ctx: Context) => {
              ctx.body = error
              ctx.valid = false
            }

            compose([...this.middleware, action])(context).then(() => {
              update({ loading: false, error: context.body } as SubscribeResult<T>)
            })
          },
          complete() {
            //
          },
        },
      )
    }

    useEffect(() => {
      if (initialQuery) initQuery()

      initSubscribe()
      return () => {
        if (isMounted() && unsubscribe) {
          unsubscribe()
        }
      }
    }, [])

    return { ...result, unsubscribe }
  }
}

function useIsMounted() {
  const isMountedRef = useRef(true)
  const isMounted = useCallback(() => isMountedRef.current, [])

  useEffect(() => {
    return () => void (isMountedRef.current = false)
  }, [])

  return isMounted
}
