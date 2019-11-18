import produce from 'immer'

import { State, Errors, Touched, Visible } from './types'

export class ActionBuilder<T> {
  constructor(
    private state: State<T>,
    private setState: any, // TODO: handle any
    private initialValue: State<T>,
  ) {}

  private runFn(fn: any, type: string) {
    const nextState = produce<State<T>, State<T>>(this.state, draft => {
      fn(draft[type])
    })

    this.setState({ ...nextState })
  }

  resetForm = () => {
    this.setState(this.initialValue)
  }

  setTouched = (fn: (touched: Touched<T>) => void) => {
    this.runFn(fn, 'touched')
  }

  setVisible = (fn: (visible: Visible<T>) => void) => {
    this.runFn(fn, 'visible')
  }

  setErrros = (fn: (errors: Errors<T>) => void) => {
    this.runFn(fn, 'errors')
  }

  setValues = (fn: (values: T) => T) => {
    this.runFn(fn, 'values')
  }

  setSubmitting = (submitting: boolean) => {
    const nextState = produce<State<T>, State<T>>(this.state, draft => {
      draft.submitting = submitting
    })
    this.setState({ ...nextState })
  }
}
