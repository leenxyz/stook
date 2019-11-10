import { KeyStore } from './KeyStore'

interface Maps {
  [key: string]: KeyStore
}

export class GlobalStore {
  private static  maps: Maps = {}
  static set(key: string, value: KeyStore) {
    if (!GlobalStore.maps[key]) {
      GlobalStore.maps[key] = value
    }
  }

  static get(key: string) {
    return GlobalStore.maps[key]
  }
}
