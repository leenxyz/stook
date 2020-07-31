import { useState, useEffect, useRef } from 'react'
import { useStore, Storage } from 'stook'
import gql from 'graphql-tag'
import get from 'lodash.get'
import compose from 'koa-compose'
import { produce } from 'immer'
import { GraphQLClient } from '@peajs/graphql-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import isEqual from 'react-fast-compare'

import { fetcher } from './fetcher'
import {
  Options,
  RefetchOptions,
  QueryResult,
  Refetch,
  FetcherItem,
  Middleware,
  Ctx,
  GraphqlOptions,
  Mutate,
  MutateResult,
  Variables,
  SubscribeResult,
  SubscriptionOption,
  FromSubscriptionOption,
  Observer,
  Start,
} from './types'
import { getDeps, getVariables, getDepsMaps, useUnmounted, useUnmount, isResolve } from './utils'

interface VarCurrent {
  value: any
  resolve: boolean
}

interface DepsCurrent {
  value: any
  resolve: boolean
}

const NULL_AS: any = null

export class Client {
  graphqlOptions: GraphqlOptions
  middleware: Middleware[] = []

  graphqlClient: GraphQLClient = NULL_AS
  subscriptionClient: SubscriptionClient = NULL_AS

  ctx: Ctx = {
    body: undefined,
    headers: {},
    valid: true,
  }

  constructor(opt: GraphqlOptions = { endpoint: '/graphql', headers: {} }) {
    const { endpoint, headers, subscriptionsEndpoint } = opt
    this.graphqlOptions = opt
    this.graphqlClient = new GraphQLClient(endpoint, {
      headers,
    } as any)

    if (subscriptionsEndpoint) {
      this.subscriptionClient = new SubscriptionClient(subscriptionsEndpoint, {
        reconnect: true,
      })
    }
  }

  config = (opt: GraphqlOptions = { endpoint: '/graphql', headers: {} }) => {
    this.graphqlOptions = { ...this.graphqlOptions, ...opt }

    const { endpoint, headers, subscriptionsEndpoint } = opt
    this.graphqlClient = new GraphQLClient(endpoint, { headers } as any)

    if (subscriptionsEndpoint) {
      this.subscriptionClient = new SubscriptionClient(subscriptionsEndpoint, {
        reconnect: true,
      })
    }
  }

  applyMiddleware = (fn: Middleware) => {
    this.middleware.push(fn)
  }

  query = async <T = any>(input: string, options: Options = {}) => {
    // TODO: 需初始化
    this.ctx.valid = true
    const { variables = {} } = options

    const opt: any = {}
    if (options.headers) {
      opt.headers = options.headers
    }

    const action = async (ctx: Ctx) => {
      try {
        ctx.body = await this.graphqlClient.query<T>(input, variables, {
          ...opt,
          headers: { ...(opt.headers || {}), ...(ctx.headers || {}) },
        })
      } catch (error) {
        ctx.body = error
        ctx.valid = false
      }
    }

    // TODO: get req headers
    await compose([...this.middleware])(this.ctx)

    // call requerst
    await compose([...this.middleware, action])(this.ctx)

    if (!this.ctx.valid) {
      throw this.ctx.body
    }
    return this.ctx.body as T
  }

  useQuery = <T = any>(input: string, options: Options<T> = {}) => {
    const isUnmouted = useUnmounted()
    const { initialData: data, onUpdate, lazy = false, pollInterval } = options
    const fetcherName = options.key || input
    const initialState = { loading: true, data } as QueryResult<T>
    const deps = getDeps(options)
    const [result, setState] = useStore(fetcherName, initialState)

    //是否应该立刻开始发送请求
    const [shoudStart, setShouldStart] = useState(!lazy)

    const update = (nextState: QueryResult<T>) => {
      setState(nextState)
      onUpdate && onUpdate(nextState)
    }

    const makeFetch = async (opt: RefetchOptions = {}): Promise<any> => {
      try {
        fetcher.get(fetcherName) && (fetcher.get(fetcherName).called = true)
        // update({ loading: true } as QueryResult<T>)
        const resData = await this.query<T>(input, opt || {})

        const nextState = produce(result, (draft: any) => {
          draft.loading = false
          if (opt.setData && typeof opt.setData === 'function') {
            opt.setData(draft.data, resData)
          } else {
            draft.data = resData
          }
        })

        update(nextState)
        return resData
      } catch (error) {
        update({ loading: false, error } as QueryResult<T>)
        // throw error
      }
    }

    const refetch: Refetch = async <P = any>(opt: RefetchOptions = {}): Promise<P> => {
      let showLoading = true
      if (typeof opt.showLoading === 'boolean' && opt.showLoading === false) {
        showLoading = false
      }

      if (showLoading) {
        update({ loading: true } as QueryResult<T>)
      }

      function getRefechVariables(opt: RefetchOptions = {}): Variables {
        if (!opt.variables) {
          return fetcher.get(fetcherName).variables || {}
        }

        if (typeof opt.variables === 'function') {
          return opt.variables(fetcher.get(fetcherName).variables)
        }
        return opt.variables
      }

      opt.variables = getRefechVariables(opt)

      // store variables to fetcher
      fetcher.get(fetcherName).variables = opt.variables

      const data: P = (await makeFetch(opt)) as any
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
        varRef.current.resolve && !fetcher.get(fetcherName).called && !isUnmouted() && shoudStart

      if (shouldFetch) {
        // store variables to fetcher
        fetcher.get(fetcherName).variables = varRef.current.value

        // make http request
        makeFetch({ ...options, variables: varRef.current.value })

        if (pollInterval && !fetcher.get(fetcherName).polled) {
          fetcher.get(fetcherName).polled = true
          /** pollInterval */
          // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [varRef.current, shoudStart])

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

  useMutate = <T = any>(input: string, options: Options = {}) => {
    const { initialData: data, onUpdate } = options
    const initialState = { data, called: false } as MutateResult<T>
    const fetcherName = options.key || input
    const [result, setState] = useStore(fetcherName, initialState)

    const update = (nextState: MutateResult<T>) => {
      setState(nextState)
      onUpdate && onUpdate(nextState)
    }

    const makeFetch = async (opt: Options = {}): Promise<any> => {
      try {
        const data = await this.query<T>(input, { ...options, ...opt })
        update({ loading: false, called: true, data } as MutateResult<T>)
        return data
      } catch (error) {
        update({ loading: false, called: true, error } as MutateResult<T>)
        // throw error
      }
    }

    const mutate = async <P = any>(variables: Variables, opt: Options = {}): Promise<P> => {
      update({ loading: true } as MutateResult<T>)
      return (await makeFetch({ ...opt, variables })) as any
    }

    const out: [Mutate, MutateResult<T>] = [mutate, result]

    return out
  }

  useSubscribe = <T = any>(input: string, options: SubscriptionOption<T> = {}) => {
    const { variables = {}, operationName = '', initialQuery = '', onUpdate } = options

    const unmounted = useRef(false)

    const initialState = { loading: true } as SubscribeResult<T>
    const [result, setState] = useState(initialState)

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

      if (unmounted.current) return

      try {
        let data = await this.query<T>(initialQuery.query, {
          variables: initialQuery.variables || {},
        })
        updateInitialQuery({ loading: false, data } as SubscribeResult<T>)
        return data
      } catch (error) {
        updateInitialQuery({ loading: false, error } as SubscribeResult<T>)
        return error
      }
    }

    const initSubscribe = async () => {
      if (unmounted.current) return

      const node = gql`
        ${input}
      `

      this.subscriptionClient
        .request({
          query: node,
          variables,
          operationName: get(node, 'definitions[0].name.value') || operationName,
        })
        .subscribe({
          next: ({ data }) => {
            const action = async (ctx: Ctx) => {
              ctx.body = data
            }
            compose([...this.middleware, action])(this.ctx).then(() => {
              update({ loading: false, data: this.ctx.body } as SubscribeResult<T>)
            })
          },
          error: error => {
            const action = async (ctx: Ctx) => {
              ctx.body = error
              ctx.valid = false
            }

            compose([...this.middleware, action])(this.ctx).then(() => {
              update({ loading: false, error: this.ctx.body } as SubscribeResult<T>)
            })
          },
          complete() {
            console.log('completed')
          },
        })
    }

    useEffect(() => {
      if (initialQuery) initQuery()

      // TODO: 参照小程序
      initSubscribe()
      return () => {
        unmounted.current = true
      }

      // eslint-disable-next-line
    }, [])

    return result
  }

  fromSubscription = <T = any>(input: string, options: FromSubscriptionOption = {}) => {
    const { variables = {} } = options

    if (!this.subscriptionClient) {
      throw new Error('require subscriptionsEndpoint config')
    }

    return {
      subscribe: (observer: Observer<T>) => {
        const ob = {} as Observer<T>

        if (observer.next) {
          ob.next = (data: T) => {
            if (observer.next) observer.next(data)
          }
        }

        if (observer.error) ob.error = observer.error
        if (observer.error) ob.complete = observer.complete

        return this.subscriptionClient
          .request({
            query: gql`
              ${input}
            `,
            variables,
          })
          .subscribe(ob as any) // TODO:
      },
    }
  }
}
