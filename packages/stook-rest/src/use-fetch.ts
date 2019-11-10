import { useState, useEffect } from 'react'
import { fetch } from './fetch'
import fetcher from './fetcher'
import { FetchResult, Refetch, Options, HooksResult, Deps, Params } from './types'

function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}

function getDeps(options?: Options): Deps {
  if (options && Array.isArray(options.deps)) return options.deps
  return []
}

function getOptions(options?: Options): Options {
  if (!options) return {}
  return options
}

function setUrlParam(url: string = '', params: Params) {
  return url
    .split('/')
    .map(item => {
      if (item.startsWith(':')) {
        return params[item.replace(/^\:/, '')]
      }
      return item
    })
    .join('/')
}

function getMethod(url: string, options: Options = {}) {
  const arr = url.split(/\s+/)
  if (arr.length === 2) return arr[0]
  const { method = 'GET' } = options
  return method
}

function getFetcherName(url: string, options: Options = {}) {
  if (options.name) return options.name
  const method = getMethod(url, options)
  url = last(url.split(/\s+/))
  return `${method} ${url}`
}

export function useFetch<T extends any>(url: string, options?: Options) {
  let reqUrl: string = url
  let unmounted = false
  const initialState = { loading: true } as FetchResult<T>
  const [result, setState] = useState(initialState)
  const deps = getDeps(options)

  const fetchData = async (opt?: Options) => {
    setState(prev => ({ ...prev, loading: true }))
    const fetchOptions = getOptions(opt)
    if (fetchOptions.params) reqUrl = setUrlParam(url, fetchOptions.params)
    try {
      const data: T = await fetch(reqUrl, fetchOptions || {})
      if (!unmounted) setState(prev => ({ ...prev, loading: false, data }))
      return data
    } catch (error) {
      if (!unmounted) setState(prev => ({ ...prev, loading: false, error }))
      throw error
    }
  }

  const refetch: Refetch = async <P = any>(opt?: Options): Promise<P> => {
    const refetchedData: any = await fetchData(opt)
    return refetchedData as P
  }

  useEffect(() => {
    const fetchOptions = getOptions(options)
    fetchData(fetchOptions)

    // store refetch fn to fetcher
    const name = getFetcherName(url, fetchOptions)
    fetcher[name] = { refetch }

    return () => {
      unmounted = true
    }
  }, deps)

  return { ...result, refetch } as HooksResult<T>
}
