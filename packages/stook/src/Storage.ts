import { Store } from './Store'

interface Stores {
  [key: string]: Store
}

/**
 * Storage for anything
 */
export class Storage {
  static stores: Stores = {}
  static set(key: string, value: Store) {
    const store = Storage.stores[key]
    if (!store || !store.setState) {
      Storage.stores[key] = value
    }
  }

  static get<S = any>(key: string): Store<S> {
    return Storage.stores[key]
  }
}
