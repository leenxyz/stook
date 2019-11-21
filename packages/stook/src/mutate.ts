import { Storage } from './Storage'

export function mutate<S>(key: string, value?: S) {
  const store = Storage.get(key)

  if (store) {
    store.setState(value)
  } else {
    // init state, if no store exist
    Storage.set(key, { state: value } as any)
  }
}
