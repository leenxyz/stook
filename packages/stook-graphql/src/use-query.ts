import { useEffect } from 'react'
import { useStore } from 'stook'
import { query } from './query'
import { fetcher } from './fetcher'

import { Options, QueryResult, Deps, Refetch, FetcherItem } from './types'

function getDeps(options?: Options): Deps {
  if (options && Array.isArray(options.deps)) return options.deps
  return []
}

export function useQuery<T = any>(input: string, options: Options<T> = {}) {
  const { initialData: data, onUpdate } = options
  const fetcherName = options.key || input
  let unmounted = false
  const initialState = { loading: true, data } as QueryResult<T>
  const deps = getDeps(options)
  const [result, setState] = useStore(fetcherName, initialState)

  function update(nextState: QueryResult<T>) {
    setState(nextState)
    onUpdate && onUpdate(nextState)
  }

  const doFetch = async (opt: Options = {}) => {
    if (unmounted) return

    try {
      const data = await query<T>(input, opt || {})
      update({ loading: false, data } as QueryResult<T>)
      return data
    } catch (error) {
      update({ loading: false, error } as QueryResult<T>)
      return error
    }
  }

  const refetch: Refetch = async <P = any>(opt?: Options): Promise<P> => {
    const data: any = await doFetch(opt)
    return data as P
  }

  useEffect(() => {
    doFetch(options)

    // store refetch fn to fetcher
    fetcher.set(fetcherName, { refetch } as FetcherItem<T>)

    return () => {
      unmounted = true
    }
  }, deps)

  return { ...result, refetch }
}
