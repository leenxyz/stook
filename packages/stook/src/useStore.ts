import { useState, useEffect } from 'react'
import { Storage } from './Storage'
import { Store } from './Store'
import { Trigger, Action } from './types'

export function useStore<S>(key: string, initialState: S | (() => S)): [S, Trigger<Action<S>>]

export function useStore<S = undefined>(key: string): [S | undefined, Trigger<Action<S>>]

export function useStore<S>(key: string, value?: S) {
  const currentStore = Storage.get(key)
  if (currentStore) {
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
