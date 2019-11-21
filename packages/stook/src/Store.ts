import { Dispatch, SetStateAction } from 'react'
import { produce } from 'immer'

/**
 * on store
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

  setState = (value: any) => {
    const nextState = this.getNextState(value)
    this.state = nextState
    this.setters.forEach(setter => setter(nextState))
  }
}
