import { useEffect } from 'react'
import { useStore, Action, Dispatch, getState, mutate } from 'stook'

function getLocalValue(key: string) {
  if (typeof window === 'undefined') return null
  const localValue: any = window.localStorage.getItem(key)
  try {
    return JSON.parse(localValue)
  } catch {
    return localValue
  }
}

export function useLocalStorage<S = any>(key: string, initialState?: S): [S, Dispatch<Action<S>>] {
  const [state, setState] = useStore<any>(key, !!initialState || getLocalValue(key))

  const setItem = (newValue: any) => {
    setState(newValue)
    const storageValue = typeof newValue === 'object' ? JSON.stringify(newValue) : newValue
    window.localStorage.setItem(key, storageValue)
  }

  // init storage
  useEffect(() => {
    const localValue: any = window.localStorage.getItem(key)
    if (typeof initialState !== 'undefined' && initialState !== localValue) {
      const storageValue =
        typeof initialState === 'object' ? JSON.stringify(initialState) : initialState
      window.localStorage.setItem(key, storageValue as any)
    }
  }, [])

  try {
    const objectValue = JSON.parse(state)
    return [objectValue, setItem]
  } catch (error) {
    return [state, setItem]
  }
}

export function getLocalStorage<S = any>(key: string): S {
  const state = getState<S>(key)
  return state || getLocalValue(key)
}

export function mutateLocalStorage<S = any>(key: string, newValue: S) {
  mutate(key, newValue)
  const storageValue: any = typeof newValue === 'object' ? JSON.stringify(newValue) : newValue
  window.localStorage.setItem(key, storageValue)
}
