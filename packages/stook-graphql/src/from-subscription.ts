import gql from 'graphql-tag'
import { graphqlConfig } from './config'
import { Variables, Interceptor, FromSubscriptionOption } from './types'
import clients from './clients'

export interface SubscriptionOption {
  variables?: Object
  operationName?: string
  initialQuery?: {
    query: string
    variables?: Variables
  }
}

export interface Observer<T> {
  next?: (value: T) => void
  error?: (error: Error) => void
  complete?: () => void
}

export function fromSubscription<T = any>(input: string, options: FromSubscriptionOption = {}) {
  const { interceptor: configInterceptors } = graphqlConfig
  const { variables = {} } = options
  let interceptor = {} as Interceptor
  if (configInterceptors) interceptor = configInterceptors

  if (!clients.subscriptionClient) {
    throw new Error('require subscriptionsEndpoint config')
  }

  return {
    subscribe(observer: Observer<T>) {
      const ob = {} as Observer<T>

      if (observer.next) {
        ob.next = (data: T) => {
          if (interceptor.responses) {
            interceptor.responses.forEach(item => {
              data = item(data)
            })
          }
          if (observer.next) observer.next(data)
        }
      }

      if (observer.error) ob.error = observer.error
      if (observer.error) ob.complete = observer.complete

      return clients.subscriptionClient
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
