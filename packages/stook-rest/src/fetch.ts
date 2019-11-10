import { request, Options } from '@peajs/request'
import { restConfig } from './config'
import { Interceptor } from './types'

export async function fetch<T = any>(url: string, options?: Options): Promise<T> {
  let reqURL: string = url
  let interceptor = {} as Interceptor

  const { endpoint, interceptor: configInterceptors } = restConfig
  const isAbsoluteURL = /http:\/\/|https:\/\//.test(url)

  if (isAbsoluteURL) {
    reqURL = url
  } else {
    const arr = url.split(/\s+/)
    // handle something like: 'POST: /todos'
    if (arr.length === 2) {
      reqURL = `${arr[0]} ${endpoint + arr[1]}`
    } else {
      reqURL = endpoint + arr[0]
    }
  }

  if (configInterceptors) interceptor = configInterceptors

  try {
    if (interceptor.requests) {
      interceptor.requests.forEach(item => {
        // TODO:
        const opt = options || { headers: {} }
        options = {
          ...options,
          ...item(opt as any),
        }
      })
    }

    let res = await request(reqURL, options)
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
