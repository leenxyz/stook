import { Options as RequestOptions } from '@peajs/request'

export type Update = (updateOptions?: RequestOptions) => any

export interface Params {
  [key: string]: string | number | boolean
}

export type Deps = ReadonlyArray<any>
export interface Options<T = any> extends RequestOptions {
  key?: string
  params?: Params
  deps?: Deps
  initialData?: T
  onUpdate?(result: Result<T>): any
}

export type Refetch = <T>(options?: Options) => Promise<T>

export interface FetcherItem<T = any> {
  refetch: Refetch
  result: Result<T>
}

export interface Fetcher<T = any> {
  [key: string]: FetcherItem<T>
}


export interface Result<T = any> {
  loading: boolean
  data: T
  error: any
}

export interface FetchResult<T> extends Result<T> {}
export interface UpdateResult<T> extends Result<T> {}

export type RequestInterceptor = (config: Options) => any
export type RequestErrorInterceptor = (config: any) => any
export type ResponseInterceptor = (error: any) => any
export type ResponseErrorInterceptor = (error: any) => any

export interface Interceptor {
  requests?: RequestInterceptor[]
  requestErrors?: RequestErrorInterceptor[]
  responses?: ResponseInterceptor[]
  responseErrors?: ResponseErrorInterceptor[]
}

export interface RestConfig {
  endpoint: string
  interceptor?: Interceptor
  headers?: HeadersInit
}

export interface Fetcher {
  [key: string]: {
    refetch: Refetch
  }
}

export interface HooksResult<T> extends FetchResult<T> {
  refetch: Refetch
}
