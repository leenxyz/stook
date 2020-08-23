import { useState, useEffect, useRef } from 'react'
import { Storage } from './Storage'
import { Store } from './Store'
import { Dispatch, Action, Key } from './types'
import { emitStoreInit } from './emitter'

/**
 * Returns a stateful value, similar to useState, but need a key;
 *
 * 用法和 useState 几乎一模一样，只是第一个参数是唯一key;
 *
 * @param key unique store key (唯一key)
 * @param initialValue  initial value, can not override, use first useStore to init
 * @see https://stook-cn.now.sh/docs/stook/use-store
 *
 * 需要注意的是，如果调用多个相同key的 useStore, 第一个被调用的 useStore 的 initialValue 才是有效的 initialValue
 */
export function useStore<S = any>(key: Key, initialValue?: S): [S, Dispatch<Action<S>>] {
  const storageStore = Storage.get(key)
  const initalValue = storageStore ? storageStore.state : initialValue
  const { current: initialState } = useRef(initalValue)

  Storage.set(key, new Store<S>(initialState))

  const newStore = Storage.get(key)
  const [state, set] = useState(initialState)
  const { setters } = newStore

  useEffect(() => {
    setters.push(set)

    emitStoreInit(key)

    return () => {
      setters.splice(setters.indexOf(set), 1)
    }
  }, [])

  function act(key: any): Dispatch<Action<S>> {
    return (value: any) => {
      return newStore.setState(key, value)
    }
  }

  return [state, act(key)]
}
