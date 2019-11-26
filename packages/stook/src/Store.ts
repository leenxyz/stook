import { produce } from 'immer'
import { Dispatch, SetStateAction } from './types'
import { emitStoreUpdate } from './emitter'

/**
 * store for one key
 */
export class Store<S = any> {
  state: S
  setters: Dispatch<SetStateAction<S>>[] = []
  constructor(value: any) {
    this.state = value
  }

  private getNextState(value: any): any {
    let nextState: any

    // not function
    if (typeof value !== 'function') return value

    // can not use immer
    if (typeof this.state !== 'object') return value()

    let useImmer = true

    const immerState = produce(this.state, draft => {
      const fnValue = value(draft)

      // use function return value
      if (fnValue && typeof fnValue === 'object') {
        nextState = fnValue
        useImmer = false
      }
    })

    if (useImmer) {
      nextState = immerState
    }

    return nextState
  }

  setState = (key: any, value: any): any => {
    const nextState = this.getNextState(value)

    emitStoreUpdate({ key, nextState })

    this.state = nextState
    this.setters.forEach(setter => setter(nextState))
  }
}
