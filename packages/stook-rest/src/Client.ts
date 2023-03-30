import { useRef, useState } from 'react'
import { request, Options as RequestOptions } from '@boter/request'
import { useEffect } from 'react'
import { useStore, Storage } from 'stook'
import compose from 'koa-compose'
import { fetcher } from './fetcher'
import {
  FetchResult,
  Refetch,
  Options,
  HooksResult,
  FetcherItem,
  Update,
  UpdateResult,
  Middleware,
  RestOptions,
} from './types'
import { useUnmount, useUnmounted, isResolve, getArg } from './utils'
import { Start } from '.'

interface ArgsCurrent {
  resolve: boolean
  params: any
  query: any
  body: any
}

/**
 * get final url for http
 * @param url
 * @param baseURL
 */
function getReqURL(url: string, baseURL: string) {
  const isAbsoluteURL = /http:\/\/|https:\/\//.test(url)

  if (isAbsoluteURL) return url
  const arr = url.split(/\s+/)

  // handle something like: 'POST: /todos'
  if (arr.length === 2) return `${arr[0]} ${baseURL + arr[1]}`

  return baseURL + arr[0]
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}

function getMethod(url: string, options: Options = {}) {
  const arr = url.split(/\s+/)
  if (arr.length === 2) return arr[0]
  const { method = 'GET' } = options
  return method
}

/**
 * unique key for cache
 * @param url api url
 * @param options
 * @returns
 */
function getFetcherName(url: string, options: Options = {}) {
  if (options.key) return options.key
  const method = getMethod(url, options)
  url = last(url.split(/\s+/))
  return `${method} ${url}`
}

export class Context {
  headers: Record<string, string> = {}
  body: any = {}
  query: any = {}
  valid: boolean = true
  url: string = ''
  method: string = ''
}

export class Client {
  restOptions: RestOptions
  middleware: Middleware[] = []

  constructor(config: RestOptions) {
    this.restOptions = config
  }

  applyMiddleware = (fn: Middleware) => {
    this.middleware.push(fn)
  }

  config = (opt: RestOptions) => {
    this.restOptions = { ...this.restOptions, ...opt }
  }

  fetch = async <T = any>(url: string, options: RequestOptions = {}): Promise<T> => {
    const context = new Context()
    const action = async (ctx: Context) => {
      const { baseURL, headers } = this.restOptions
      const reqURL = getReqURL(url, baseURL)

      ctx.url = reqURL
      ctx.method = options.method || ''

      // merge global headers, interceptor headers,fetch headers
      options.headers = { ...headers, ...ctx.headers, ...options.headers } as any

      if (['PATCH', 'POST', 'PUT'].includes(options.method || '')) {
        options.body = { ...ctx.body, ...((options.body as any) || {}) }
      }

      options.query = { ...ctx.query, ...(options.query || {}) }

      try {
        ctx.body = await request(reqURL, options)
      } catch (error) {
        ctx.body = error
        ctx.valid = false
        throw ctx.body
      }
    }

    await compose([...this.middleware, action])(context)

    if (!context.valid) throw context.body
    return context.body
  }

  useFetch = <T = any>(url: string, options: Options<T> = {}) => {
    const isUnmouted = useUnmounted()
    const { initialData: data, key, onUpdate, lazy = false } = options
    const initialState = { loading: true, called: false, data } as FetchResult<T>
    const fetcherName = key || getFetcherName(url, options)
    const [result, setState] = useStore(fetcherName, initialState)

    // 是否应该立刻开始发送请求
    const [shouldStart, setShouldStart] = useState(!lazy)

    const update = (nextState: Partial<FetchResult<T>>) => {
      setState(nextState as FetchResult<T>)
      onUpdate && onUpdate(nextState as FetchResult<T>)
    }

    const makeFetch = async (opt?: Options) => {
      try {
        update({ loading: true, called: true })
        fetcher.get(fetcherName).called = true
        const data: T = await this.fetch(url, opt || {})

        update({ loading: false, data, called: true })
        return data
      } catch (error) {
        update({ loading: false, error, called: true })
        throw error
      }
    }

    const refetch: Refetch = async <P = any>(opt?: Options): Promise<P> => {
      update({ loading: true, called: true })
      const refetchedData: any = await makeFetch(opt)
      return refetchedData as P
    }

    const argsRef = useRef<ArgsCurrent>({
      resolve: isResolve(options.params) && isResolve(options.query) && isResolve(options.body),
      params: getArg(options.params),
      query: getArg(options.query),
      body: getArg(options.body),
    })

    if (
      !argsRef.current.resolve &&
      getArg(options.params) &&
      getArg(options.query) &&
      getArg(options.body)
    ) {
      argsRef.current = {
        resolve: true,
        params: getArg(options.params),
        query: getArg(options.query),
        body: getArg(options.body),
      }
    }

    const getOpt = (options: Options): Options => {
      if (Object.keys(argsRef.current.params).length) {
        options.params = argsRef.current.params
      }
      if (Object.keys(argsRef.current.query).length) {
        options.query = argsRef.current.query
      }
      if (Object.keys(argsRef.current.body).length) {
        options.body = argsRef.current.body
      }

      return options
    }

    // TODO: 要确保 args resolve
    const start: Start = (opt): any => {
      if (opt?.params) argsRef.current.params = opt?.params
      if (opt?.query) argsRef.current.query = opt?.query
      if (opt?.body) argsRef.current.body = opt?.body
      setShouldStart(true)
    }

    useEffect(() => {
      // store refetch fn to fetcher
      if (!fetcher.get(fetcherName)) {
        fetcher.set(fetcherName, { refetch, called: false } as FetcherItem<T>)
      }

      // if resolve, 说明已经拿到最终的 args
      const shouldFetch =
        argsRef.current.resolve && !fetcher.get(fetcherName).called && !isUnmouted() && shouldStart

      if (shouldFetch) {
        const opt = getOpt(options)
        makeFetch(opt)
      }
    }, [argsRef.current, shouldStart])

    // when unmount
    useUnmount(() => {
      // 全部 unmount，设置 called false
      const store = Storage.get(fetcherName)

      // 对应的 hooks 全部都 unmount 了
      if (store && store.setters.length === 0) {
        // 重新设置为 false，以便后续调用刷新
        fetcher.get(fetcherName).called = false

        // TODO: 要为true ? 还是 undefined 好
        update({ loading: true, called: false } as any)
      }
    })

    return { ...result, refetch, start } as HooksResult<T>
  }

  useUpdate = <T = any>(url: string, options: RequestOptions = {}) => {
    options.method = options.method || 'POST'
    const fetcherName = getFetcherName(url, options)
    const initialState = { loading: false, called: false } as UpdateResult<T>
    const [result, setState] = useStore(fetcherName, initialState)

    const updateData = async (updateOptions: RequestOptions = {}) => {
      try {
        setState({ loading: true } as UpdateResult<T>)
        const data: T = await this.fetch(url, { ...options, ...updateOptions })
        const nextState = { loading: false, called: true, data } as UpdateResult<T>
        setState(nextState)
        return nextState
      } catch (error) {
        const nextState = { loading: false, called: true, error } as UpdateResult<T>
        setState(nextState)
        return nextState
      }
    }

    const update = async (updateOptions: RequestOptions = {}): Promise<any> => {
      return await updateData(updateOptions)
    }

    const out: [Update<T>, UpdateResult<T>] = [update, result]

    return out
  }
}
