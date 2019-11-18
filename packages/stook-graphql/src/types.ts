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

export interface GraphqlConfig {
  endpoint: string
  subscriptionsEndpoint?: string
  interceptor?: Interceptor
  headers?: HeadersInit
}

export interface SubscriptionOption {
  variables?: Object
  operationName?: string
  initialQuery?: {
    query: string
    variables?: Variables
  }
}

export interface FromSubscriptionOption {
  variables?: Object
}
