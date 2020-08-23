import { Storage } from './Storage'
import { Key } from './types'

const undefined_as_any: any = undefined

/**
 * Get store by Key
 * @param key
 */
export function getState<S = any>(key: Key): S {
  const store = Storage.get<S>(key)
  return store ? store.state : undefined_as_any
}
