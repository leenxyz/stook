import mitt from 'mitt'

interface Data {
  key: any
  nextState: any
}

type Events = {
  STORE_INITED: string
  STORE_UPDATED: Data
}

enum EventKey {
  STORE_INITED = 'STORE_INITED',
  STORE_UPDATED = 'STORE_UPDATED',
}

export const emitter = mitt<Events>()

export function emitStoreInit(key: any) {
  emitter.emit(EventKey.STORE_INITED, key)
}

export function emitStoreUpdate(data: Data) {
  emitter.emit(EventKey.STORE_UPDATED, data)
}

export function onStoreInit(cb: (data: string) => void) {
  emitter.on(EventKey.STORE_INITED, key => {
    cb(key)
  })
}

export function onStoreUpdate(cb: (data: Data) => void) {
  emitter.on(EventKey.STORE_UPDATED, data => {
    cb(data)
  })
}
