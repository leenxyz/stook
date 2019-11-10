import clients from './clients'
import { graphqlConfig } from './config'
import { Options } from './types'
import { Interceptor } from './types'

export const query = async <T = any>(input: string, options: Options = {}) => {
  const { variables = {} } = options
  let interceptor = {} as Interceptor
  const { interceptor: configInterceptors } = graphqlConfig

  if (configInterceptors) interceptor = configInterceptors

  if (interceptor.requests) {
    interceptor.requests.forEach(item => {
      options = item(options) || {}
    })
  }

  try {
    let res = await clients.graphqlClient.query<T>(input, variables, {
      headers: options.headers || ({} as any),
    })
    if (interceptor.responses) {
      interceptor.responses.forEach(item => {
        res = item(res)
      })
    }
    return res
  } catch (error) {
    throw error
  }
}
