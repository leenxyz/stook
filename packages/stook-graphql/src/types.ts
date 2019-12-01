export interface Variables {
  [key: string]: any
}

export type Refetch = <T>(options?: Options) => Promise<T>

export type Deps = ReadonlyArray<any>

export interface Options<T = any> {
  key?: string
  variables?: Variables
  deps?: Deps
  headers?: HeadersInit
  initialData?: T
  onUpdate?(result: Result<T>): any
  // retryOn: any
  // retryDelay: any
  // retryOnError: false
}

export type Mutate = (variables: Variables, options?: Options) => any

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

export interface QueryResult<T> extends Result<T> {
  refetch: Refetch
}

export interface MutateResult<T> extends Result<T> {}

export interface SubscribeResult<T> extends Result<T> {}

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
  }
  onUpdate?(result: Result<T>): any
}

export interface FromSubscriptionOption {
  variables?: Object
}

export interface Ctx {
  headers: {
    [key: string]: string
  }
  body: any
  valid: boolean
}

export type NextFn = () => Promise<any>

export type Middleware = (ctx: Ctx, next: NextFn) => any
