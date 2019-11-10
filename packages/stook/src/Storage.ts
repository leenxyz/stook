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
    if (!Storage.stores[key]) {
      Storage.stores[key] = value
    }
  }

  static get<S = any>(key: string): Store<S> {
    return Storage.stores[key]
  }
}
