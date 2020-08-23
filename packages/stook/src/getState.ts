import { Storage } from './Storage'
import { keyType } from './types'

const undefined_as_any: any = undefined

/**
 * Get store by Key
 * @param key
 */
export function getState<S = any, K = string>(key: K | keyType): S {
  const store = Storage.get<S>(key)
  return store ? store.state : undefined_as_any
}
