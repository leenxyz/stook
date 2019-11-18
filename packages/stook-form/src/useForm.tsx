import { useRef } from 'react'
import { useStore } from 'stook'
import deepmerge from 'deepmerge'
import { State, ModelType, Handlers, Actions, Result, Options } from './types'
import { HandlerBuilder } from './HandlerBuilder'
import { ActionBuilder } from './ActionBuilder'
import { ToolBuilder } from './ToolBuilder'
import { Validator } from './Validator'
import { useIsMounted } from './utils/useIsMounted'
import { uuid } from './utils/uuid'

/**
 * useForm hooks
 * @generic T Model Type
 * @param Model
 */
export function useForm<T>(Model: ModelType<T>, options: Options<T> = {}) {
  const instance = new Model()
  const initialValue = useRef<State<T>>({
    values: instance,
    touched: {},
    errors: {},
    visible: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
  })
  const isMounted = useIsMounted()
  const key = options.name || `STOOK_FORM_${uuid()}`

  if (!isMounted) {
    initialValue.current.values = !options.initValues
      ? instance
      : deepmerge<T>(instance, options.initValues(instance) || {})
  }

  const [state, setState] = useStore(key, initialValue.current)
  const actionBuilder = new ActionBuilder(state, setState, initialValue.current)

  const actions = {
    setTouched: actionBuilder.setTouched,
    setValues: actionBuilder.setValues,
    setErrors: actionBuilder.setErrros,
    setVisible: actionBuilder.setVisible,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm: actionBuilder.resetForm,
    setState,
  } as Actions<T>

  const validator = new Validator(Model, state, actions, options)
  const handlerBuilder = new HandlerBuilder(state, actions, setState, options, validator)
  const submitHandler = handlerBuilder.createSubmitHandler()

  const handlers: Handlers = {
    handleBlur: handlerBuilder.createBlurHandler(),
    handleChange: handlerBuilder.createChangeHandler(),
    handleSubmit: submitHandler,
  }

  const toolBuilder = new ToolBuilder(handlers, handlerBuilder, state, actions)

  actions.submitForm = submitHandler // attach submitHandler to action

  const result: Result<T> = {
    state,
    handlers,
    actions,
    handlerBuilder,
    name: toolBuilder.createName(),
    error: toolBuilder.createError(),
    help: toolBuilder.createHelp(),
  }
  return result
}
