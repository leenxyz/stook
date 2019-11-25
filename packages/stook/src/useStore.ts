import { useState, useEffect, useRef } from 'react'
import { Storage } from './Storage'
import { Store } from './Store'
import { Trigger, Action } from './types'
import isEqual from 'react-fast-compare'

export function useStore<S = any>(key: string, value?: S): [S, Trigger<Action<S>>] {
  const storageStore = Storage.get(key)
  const initalValue = storageStore ? storageStore.state : value
  const { current: initialState } = useRef(initalValue)

  // check multi init
  if (!isEqual(initialState, value) && value !== undefined) {
    const initialStateString = JSON.stringify(initialState)
    const error = new Error(
      `[stook]: store ${key} is inited with ${initialStateString}, initialState is unnecessary`,
    )
    console.warn(error)
  }

  Storage.set(key, new Store<S>(initialState))

  const newStore = Storage.get(key)
  const [state, set] = useState<S>(initialState)
  const { setters } = newStore

  useEffect(() => {
    setters.push(set)
    return () => {
      setters.splice(setters.indexOf(set), 1)
    }
  }, [])

  return [state, newStore.setState]
}
