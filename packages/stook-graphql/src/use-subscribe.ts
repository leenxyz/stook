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

  function update(nextState: SubscribeResult<T>) {
    setState(nextState)
    onUpdate && onUpdate(nextState)
  }

  const initQuery = async () => {
    if (!initialQuery) return
    if (unmounted) return

    try {
      let data = await query<T>(initialQuery.query, { variables: initialQuery.variables || {} })
      update({ loading: false, data } as SubscribeResult<T>)
      return data
    } catch (error) {
      update({ loading: false, error } as SubscribeResult<T>)
      return error
    }
  }

  const fetchData = async () => {
    if (unmounted) return
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

          update({ loading: false, data } as SubscribeResult<T>)
        },
        error(error) {
          update({ loading: false, error } as SubscribeResult<T>)
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
