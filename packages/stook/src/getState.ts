import { Storage } from './Storage'

export function getState<S>(key: string) {
  const store = Storage.get<S>(key)
  return store ? store.state : null
}
