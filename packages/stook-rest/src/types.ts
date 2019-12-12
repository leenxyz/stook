import { Options as RequestOptions } from '@peajs/request'

export type Update = (updateOptions?: RequestOptions) => any

export interface Params {
  [key: string]: string | number | boolean
}

export type Deps = ReadonlyArray<any>
export interface Options<T = any> extends RequestOptions {
  key?: string
  params?: Params | (() => Params)
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

export interface RestOptions {
  baseURL: string
  headers?: HeadersInit
  middlewares?: Middleware[]
}

export interface HooksResult<T> extends FetchResult<T> {
  refetch: Refetch
}

export interface Ctx {
  headers: {
    [key: string]: string
  }
  body: any
  valid: boolean
}

export type Middleware = (ctx: Ctx, next: () => Promise<any>) => any
