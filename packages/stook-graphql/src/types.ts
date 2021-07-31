import type { Context } from './Client'
export interface Variables {
  [key: string]: any
}

export type SetData<T> = (data: T, newData: T) => void

export interface Options<T = any, V = Variables> {
  key?: string
  variables?: V | (() => V)
  deps?: Deps
  headers?: HeadersInit
  initialData?: T
  pollInterval?: number
  lazy?: boolean
  timeout?: number
  onUpdate?(result: Result<T>): any

  // TODO: 乐观更新
  // optimisticResponse?: any
  // retryOn: any
  // retryDelay: any
  // retryOnError: false
  // onError(err)
  // errorRetryCount
  // errorRetryInterval

  // 覆盖 Client endpoint
  endpoint?: string
}

export interface RefetchOptions<T = any, V = Variables> {
  key?: string
  variables?: V | ((prevVariables: V) => V)
  headers?: HeadersInit
  setData?: SetData<T>
  showLoading?: boolean
}

export type Refetch = <T>(options?: RefetchOptions<T>) => Promise<T>

export type Start = <T>() => Promise<T>

export type Deps = ReadonlyArray<any>

export interface FetcherItem<T = any, V = Variables> {
  refetch: Refetch
  start: Start
  result: Result<T>
  called: boolean
  polled: boolean
  variables?: V
}

export interface Fetcher<T = any> {
  [key: string]: FetcherItem<T>
}

export interface Result<T = any> {
  loading: boolean
  called: boolean
  data: T
  error: any
}

export interface QueryResult<T> extends Result<T> {
  refetch: Refetch
  start: Start
  called: boolean
}

export interface MutateResult<T> extends Result<T> {}

export interface SubscribeResult<T> extends Result<T> {
  unsubscribe: () => void
}

export interface GraphqlOptions {
  endpoint: string
  subscriptionsEndpoint?: string
  headers?: HeadersInit
}

export interface Observer<T> {
  next?: (value: T) => void
  error?: (error: Error) => void
  complete?: () => void
}

export interface SubscriptionOption<T = any> {
  key?: string
  variables?: Object
  operationName?: string
  initialQuery?: {
    query: string
    variables?: Variables
    onUpdate?(result: Result<T>): any
  }
  onUpdate?(result: Result<T>): any
}

export interface FromSubscriptionOption {
  variables?: Object
}

export type NextFn = () => Promise<any>

export type Middleware = (ctx: Context, next: NextFn) => any
