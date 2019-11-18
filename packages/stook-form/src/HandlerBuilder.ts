import { FocusEvent } from 'react'
import produce, { original } from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'
import isEqual from 'react-fast-compare'

import { FieldElement, State, Errors, Actions, Options } from './types'
import { Validator } from './Validator'
import { checkValid } from './utils/checkValid'
import { touchAll } from './utils/touchAll'
import { isTouched } from './utils/isTouched'
import { StookForm } from './StookForm'

export class HandlerBuilder<T> {
  constructor(
    private state: State<T>,
    private actions: Actions<T>,
    private setState: any,
    private options: Options<T>,
    private validator: Validator<T>,
  ) {}

  private runExcludes(draft: any) {
    const target = Object.getPrototypeOf(this.state.values)
    const excludes = StookForm.excludeMaps.get(target)
    if (!excludes) return
    for (const item of excludes) {
      if (item.fn(draft.values)) {
        delete draft.values[item.propertyKey]
      }
    }
  }

  private flatObject(obj: any, parentKey = '', result = {}) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        this.flatObject(obj[key], key, result)
      } else {
        const cur = parentKey ? `${parentKey}.${key}` : key
        result[cur] = obj[key]
      }
    }
    return result
  }

  private checkVisible(draft: any) {
    // handle visible
    const flatVisible = this.flatObject(draft.visible)

    for (const key of Object.keys(flatVisible)) {
      if (flatVisible[key] !== false) continue
      if (!key.includes('.')) {
        delete draft.values[key]
      } else {
        const arr = key.split('.')
        const last = arr.pop() as string
        delete get(draft.values, arr.join('.'))[last]
      }
    }
  }

  private updateBeforeSubmit(errors: Errors<T>) {
    const { state, options, actions, setState } = this
    // update state
    const nextState = produce<State<T>, State<T>>(state, draft => {
      state.errors = errors
      const isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.touched = touchAll(state.values)
      draft.submitCount += 1
      draft.submitting = true
      draft.dirty = true

      this.runExcludes(draft)
      this.checkVisible(draft)

      if (!isValid && options.onError) {
        options.onError(original<any>(draft.errors), { state, actions })
      }
      if (isValid && options.onSubmit) {
        options.onSubmit(draft.values, { state, actions })
      }
    })

    setState({ ...nextState })
  }

  private getValue(value: any, type: string, checked: boolean, name: string): any {
    const { state } = this

    if (/number|range/.test(type)) {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? '' : parsed
    }

    if (/checkbox/.test(type)) {
      const checkedValues = get(state.values, name)
      if (checked) {
        return [...checkedValues, value]
      }
      return checkedValues.filter((item: any) => item !== value)
    }
    return value
  }

  createSubmitHandler = () => {
    return async (e?: any) => {
      if (e && e.preventDefault) e.preventDefault()
      const errors = await this.validator.validateForm()
      this.updateBeforeSubmit(errors)
    }
  }

  createBlurHandler = (name?: string) => {
    const { state, setState } = this

    return async (e: FocusEvent<FieldElement>) => {
      let fieldName: string
      if (name) {
        fieldName = name
      } else {
        if (e.persist) e.persist()

        // hack for some custom onChange, eg: Antd Select
        const node = typeof e === 'object' ? e.target : ({} as any)
        const { name } = node
        fieldName = name
      }

      const errors = await this.validator.validateForm()
      const nextState = produce<State<T>, State<T>>(state, draft => {
        set(draft.touched, fieldName, true)
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }

  createChangeHandler = (name?: string) => {
    const { state, setState } = this
    return async (e?: any) => {
      let fieldName: string = ''
      let value: any

      // hack for some custom onChange, eg: Antd Select
      if (name) fieldName = name

      if (typeof e === 'object' && e.target) {
        if (e && e.persist) e.persist()
        const { value: nodeValue, name, type, checked } = e.target
        if (name) fieldName = name
        value = this.getValue(nodeValue, type, checked, name)
      } else {
        value = e
      }

      // setValues first，do not block ui
      const newState = produce<State<T>, State<T>>(state, draft => {
        set(draft.values as any, fieldName, value)
        this.runExcludes(draft)
        this.checkVisible(draft)
      })
      setState({ ...newState })

      // validate only touched
      if (!isTouched(state.touched, fieldName)) return

      // setErrors
      const errors = await this.validator.validateForm()

      if (isEqual(errors, state.errors)) return

      const nextState = produce<State<T>, State<T>>(state, draft => {
        // check from is valid
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }
}
