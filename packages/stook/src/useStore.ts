import { useState, useEffect } from 'react'
import { Storage } from './Storage'
import { Store } from './Store'
import { Trigger, Action } from './types'

export function useStore<S = any>(key: string, value?: S): [S, Trigger<Action<S>>] {
  const currentStore = Storage.get(key)
  const inited = currentStore && Reflect.has(currentStore, 'state')

  if (inited) {
    if (value !== undefined) {
      const error = new Error(`[stook]: store ${key} is inited, initialState is unnecessary`)
      console.warn(error)
    }
    value = currentStore.state
  }

  Storage.set(key, new Store<S>(value))

  const newStore = Storage.get(key)

  const [state, set] = useState<S>(newStore.state)
  const { setters } = newStore

  useEffect(() => {
    setters.push(set)
    return () => {
      setters.splice(setters.indexOf(set), 1)
    }
  }, [])

  return [state, newStore.setState]
}
