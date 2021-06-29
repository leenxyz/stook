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

  private getNextState(state: S, value: any): any {
    let nextState: any

    // not function
    if (typeof value !== 'function') return value

    // can not use immer
    if (typeof state !== 'object') return value(state)

    let useImmer = true

    const immerState = produce(state, draft => {
      const fnValue = value(draft)
      if (fnValue === draft) return // do nothing

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

  setState = (key: any, state: any, value: any): any => {
    const nextState = this.getNextState(state, value)

    this.state = nextState

    emitStoreUpdate({ key, nextState })

    this.state = nextState
    this.setters.forEach(set => set(nextState))
    return nextState
  }
}
