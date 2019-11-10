import { Storage } from './Storage'

export function mutate<S>(key: string, value?: S) {
  const store = Storage.get(key)
  if (store) {
    store.setState(value)
  } else {
    // TODO:
  }
}
