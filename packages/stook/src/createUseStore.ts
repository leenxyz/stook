import { Storage } from './Storage'
import { Store } from './Store'
import { Dispatch, Action } from './types'

import { emitStoreInit } from './emitter'

export function createUseStore(useState: any, useEffect: any, useRef: any) {
  return function useStore<S = any, K = string>(key: K, value?: S): [S, Dispatch<Action<S>>] {
    const storageStore = Storage.get(key)
    const initalValue = storageStore ? storageStore.state : value
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
}
