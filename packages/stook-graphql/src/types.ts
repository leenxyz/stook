export interface Variables {
  [key: string]: any
}

export type Refetch = <T>(options?: RefetchOptions<T>) => Promise<T>
export type Start = <T>() => Promise<T>

export type Deps = ReadonlyArray<any>

export interface Options<T = any> {
  key?: string
  variables?: Variables | ((prevVariables: Variables) => Variables)
  deps?: Deps
  headers?: HeadersInit
  initialData?: T
  pollInterval?: number
  lazy?: boolean
  timeout?: number
  onUpdate?(result: Result<T>): any
  // retryOn: any
  // retryDelay: any
  // retryOnError: false
}

export interface RefetchOptions<T = any> extends Options<T> {
  showLoading?: boolean
}

export type Mutate = <P = any>(variables: Variables, options?: Options) => Promise<P>

export interface FetcherItem<T = any> {
  refetch: Refetch
  start: Start
  result: Result<T>
  called: boolean
  polled: boolean
  variables: Variables
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
