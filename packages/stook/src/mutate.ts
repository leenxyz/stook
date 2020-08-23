import { Key } from './types'
import { Storage } from './Storage'

/**
 * update store by key
 *
 * @param key unique store key (唯一key)
 * @param nextValue  next value
 */
export function mutate<S>(key: Key, nextValue?: S) {
  const store = Storage.get(key)

  if (store && store.setState) {
    store.setState(key, nextValue)
  } else {
    // init state, if no store exist
    Storage.set(key, { state: nextValue } as any)
  }
}
