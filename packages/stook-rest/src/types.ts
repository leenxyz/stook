import { Options as RequestOptions } from '@peajs/request'
import type { Context } from './Client'

export type Update<T> = (updateOptions?: RequestOptions) => Promise<UpdateResult<T>>

export interface Options<T = any> extends RequestOptions {
  key?: string
  initialData?: T
  lazy?: boolean
  onUpdate?(result: Result<T>): any
}

export type Refetch = <T>(options?: Options) => Promise<T>

export type Start = <T>(options?: Options) => Promise<T>

export interface FetcherItem<T = any> {
  refetch: Refetch
  start: Start
  result: Result<T>
  called: boolean // is request called
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

export interface FetchResult<T> extends Result<T> {}
export interface UpdateResult<T> extends Result<T> {}

export interface RestOptions {
  baseURL: string
  headers?: HeadersInit
  middlewares?: Middleware[]
}

export interface HooksResult<T> extends FetchResult<T> {
  start: Start
  refetch: Refetch
}

export type Middleware = (ctx: Context, next: () => Promise<any>) => any
