import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { graphqlConfig } from './config'
import { query } from './query'
import clients from './clients'
import { SubscribeResult, Interceptor, SubscriptionOption } from './types'

export function useSubscribe<T = any>(input: string, options: SubscriptionOption<T> = {}) {
  const { interceptor: configInterceptors } = graphqlConfig
  const { variables = {}, operationName = '', initialQuery = '', onUpdate } = options

  let unmounted = false
  let interceptor = {} as Interceptor
  const initialState = { loading: true } as SubscribeResult<T>
  const [result, setState] = useState(initialState)

  if (configInterceptors) interceptor = configInterceptors

  function update(updatedState: Partial<SubscribeResult<T>>) {
    const newState = { ...result, ...updatedState }
    setState(newState)
    onUpdate && onUpdate(newState)
  }

  const initQuery = async () => {
    if (!initialQuery) return

    try {
      let data = await query<T>(initialQuery.query, { variables: initialQuery.variables || {} })

      if (!unmounted) {
        update({ loading: false, data })
      }
      return data
    } catch (error) {
      if (!unmounted) {
        update({ loading: false, error })
      }
      return error
    }
  }

  const fetchData = async () => {
    clients.subscriptionClient
      .request({
        query: gql`
          ${input}
        `,
        variables,
        operationName,
      })
      .subscribe({
        next({ data }) {
          if (interceptor.responses) {
            interceptor.responses.forEach(item => {
              data = item(data)
            })
          }

          if (!unmounted) {
            update({ loading: false, data: data as any })
          }
        },
        error(error) {
          if (!unmounted) {
            update({ loading: false, error })
          }
        },
        complete() {
          console.log('completed')
        },
      })
  }

  useEffect(() => {
    if (initialQuery) initQuery()

    fetchData()
    return () => {
      unmounted = true
    }
  }, [])

  return result
}
