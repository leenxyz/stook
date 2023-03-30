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
  const [state, setState] = useStore<any>(key, initialState)

  const setItem = (newValue: any) => {
    const nextValue = setState(newValue)
    const storageValue = typeof nextValue === 'object' ? JSON.stringify(nextValue) : nextValue
    window.localStorage.setItem(key, storageValue as any)
  }

  // init storage
  useEffect(() => {
    const localValue = getLocalValue(key)

    // 如果 localStorage 有值，优先使用 localStorage 的值
    if (localValue) {
      setState(localValue)
    } else {
      if (initialState) {
        setState(initialState)
        window.localStorage.setItem(key, JSON.stringify(initialState))
      }
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
  const nextValue = mutate(key, newValue)
  const storageValue: any = typeof nextValue === 'object' ? JSON.stringify(nextValue) : nextValue

  window.localStorage.setItem(key, storageValue)
}
