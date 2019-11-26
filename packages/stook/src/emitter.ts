import mitt from 'mitt'

interface Data {
  key: any
  nextState: any
}

export const emitter = mitt()

export const STORE_INITED = 'STORE_INITED'

export const STORE_UPDATED = 'STORE_UPDATED'

export function emitStoreInit(key: any) {
  emitter.emit(STORE_INITED, key)
}

export function emitStoreUpdate(data: Data) {
  emitter.emit(STORE_UPDATED, data)
}

export function onStoreInit(cb: (data: string) => void) {
  emitter.on(STORE_INITED, key => {
    cb(key)
  })
}

export function onStoreUpdate(cb: (data: Data) => void) {
  emitter.on(STORE_UPDATED, data => {
    cb(data)
  })
}
