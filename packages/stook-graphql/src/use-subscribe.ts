import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { graphqlConfig } from './config'
import { query } from './query'
import clients from './clients'
import { SubscribeResult, Interceptor, SubscriptionOption } from './types'

export function useSubscribe<T = any>(input: string, options: SubscriptionOption = {}) {
  const { interceptor: configInterceptors } = graphqlConfig
  const { variables = {}, operationName = '', initialQuery = '' } = options

  let unmounted = false
  let interceptor = {} as Interceptor
  const initialState = { loading: true } as SubscribeResult<T>
  const [result, setState] = useState(initialState)

  if (configInterceptors) interceptor = configInterceptors

  const initQuery = async () => {
    if (!initialQuery) return

    setState(prev => ({ ...prev, loading: true }))
    try {
      let data = await query<T>(initialQuery.query, { variables: initialQuery.variables || {} })

      if (interceptor.responses) {
        interceptor.responses.forEach(item => {
          data = item(data)
        })
      }

      if (!unmounted) setState(prev => ({ ...prev, loading: false, data }))
      return data
    } catch (error) {
      if (!unmounted) setState(prev => ({ ...prev, loading: false, error }))
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
          if (!unmounted) setState(prev => ({ ...prev, loading: false, data: data as any }))
        },
        error(error) {
          if (!unmounted) setState(prev => ({ ...prev, loading: false, error }))
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
