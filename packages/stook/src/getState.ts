import { Storage } from './Storage'

const undefined_as_any: any = undefined

export function getState<S = any>(key: string): S {
  const store = Storage.get<S>(key)
  return store ? store.state : undefined_as_any
}
