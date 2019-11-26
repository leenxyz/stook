import { useEffect } from 'react'
import { useStore } from 'stook'
import { fetch } from './fetch'
import { fetcher } from './fetcher'
import { FetchResult, Refetch, Options, HooksResult, Deps, Params, FetcherItem } from './types'


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
  if (options.key) return options.key
  const method = getMethod(url, options)
  url = last(url.split(/\s+/))
  return `${method} ${url}`
}

export function useFetch<T extends any>(url: string, options: Options<T> = {}) {
  let reqUrl: string = url
  let unmounted = false
  const { initialData: data, onUpdate } = options
  const initialState = { loading: true, data } as FetchResult<T>
  const deps = getDeps(options)
  const fetcherName = getFetcherName(url, options)
  const [result, setState] = useStore(fetcherName, initialState)

  function update(updatedState: Partial<FetchResult<T>>) {
    const newState = { ...result, ...updatedState }
    setState(newState)
    onUpdate && onUpdate(newState)
  }

  const doFetch = async (opt?: Options) => {
    const fetchOptions = getOptions(opt)
    if (fetchOptions.params) reqUrl = setUrlParam(url, fetchOptions.params)
    try {
      const data: T = await fetch(reqUrl, fetchOptions || {})
      if (!unmounted) {
        update({ loading: false, data })
      }
      return data
    } catch (error) {
      if (!unmounted) {
        update({ loading: false, error })
      }
      throw error
    }
  }

  const refetch: Refetch = async <P = any>(opt?: Options): Promise<P> => {
    const refetchedData: any = await doFetch(opt)
    return refetchedData as P
  }

  useEffect(() => {
    const fetchOptions = getOptions(options)
    doFetch(fetchOptions)

    // store refetch fn to fetcher
    fetcher.set(fetcherName, { refetch } as FetcherItem<T>)

    return () => {
      unmounted = true
    }
  }, deps)

  return { ...result, refetch } as HooksResult<T>
}
