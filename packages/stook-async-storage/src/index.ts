import { useEffect, useCallback } from 'react'
import { useStore, Action, Dispatch, getState, mutate } from 'stook'

export interface AsyncStorageResult<S = any> {
  loading: boolean
  setLoading: Dispatch<Action<boolean>>
  data: S
  setData: Dispatch<Action<S>>
}

function getLocalValue(key: string) {
  if (typeof window === 'undefined') return null
  const localValue: any = window.localStorage.getItem(key)
  try {
    return JSON.parse(localValue)
  } catch {
    return localValue
  }
}

export function useAsyncStorage<S = any>(key: string, defaultStorage?: S) {
  const [loading, setLoading] = useStore(`${key}_loading`, true)
  const [state, setState] = useStore(key, defaultStorage)

  const setItem = useCallback(
    (newValue: any) => {
      const nextValue = setState(newValue)
      const storageValue = typeof nextValue === 'object' ? JSON.stringify(nextValue) : nextValue
      window.localStorage.setItem(key, storageValue as any)
    },
    [setState, key],
  )

  // init storage
  useEffect(() => {
    const localValue = getLocalValue(key)

    if (localValue) {
      setState(localValue)
    } else {
      if (defaultStorage) {
        setState(defaultStorage)
        window.localStorage.setItem(key, JSON.stringify(defaultStorage))
      }
    }
    setLoading(false)
  }, [])

  return {
    loading,
    setLoading,
    data: state,
    setData: setItem,
  } as AsyncStorageResult<S>
}

export function getStorage<S = any>(key: string): S {
  const state = getState<S>(key)
  return state || getLocalValue(key)
}

export function mutateStorage<S = any>(key: string, newValue: S) {
  const nextValue = mutate(key, newValue)
  const storageValue: any = typeof nextValue === 'object' ? JSON.stringify(nextValue) : nextValue
  window.localStorage.setItem(key, storageValue)
}
