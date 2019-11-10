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

  // TODO: handle any
  setState = (value: any) => {
    const useImmer = typeof value === 'function' && typeof this.state === 'object'

    if (!useImmer) {
      this.state = value
      this.setters.forEach(setter => setter(this.state))
      return
    }

    const nextState = produce(this.state, draft => {
      value(draft)
    })

    this.state = nextState
    this.setters.forEach(setter => setter(nextState))
  }
}
