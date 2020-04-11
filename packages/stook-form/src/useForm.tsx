import 'reflect-metadata'
import { useRef, useCallback } from 'react'
import { useStore } from 'stook'
import { State, EntityType, Handlers, Actions, Result, Options } from './types'
import { HandlerBuilder } from './builders/HandlerBuilder'
import { ActionBuilder } from './builders/ActionBuilder'
import { ToolBuilder } from './builders/ToolBuilder'
import { Validator } from './Validator'
import { useIsMounted } from './utils/useIsMounted'
import { uuid } from './utils/uuid'
import { entityStore } from './stores/entityStore'
import { getInitialValues } from './utils/getInitialValues'
import { getInitialVisibles } from './utils/getInitialVisibles'

/**
 * useForm hooks
 * @generic T Entity Type
 * @param Entity
 */
export function useForm<T>(Entity: EntityType<T>, options: Options<T> = {}) {
  const instanceRef = useRef<T>(new Entity())
  const instance = instanceRef.current
  const initialState = useRef<State<T>>({
    values: instance,
    touched: {},
    errors: {},
    visibles: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
  })
  const formName = entityStore.get(Entity)
  const isMounted = useIsMounted()
  const name = useRef(options.name || formName || `STOOK_FORM_${uuid()}`)

  if (!isMounted) {
    const defaultValues = getInitialValues(instance, options)
    initialState.current.values = defaultValues
    initialState.current.visibles = getInitialVisibles(instance)
  }

  // eslint-disable-next-line
  const [state, setState] = useStore(name.current, initialState.current)
  const actionBuilder = new ActionBuilder(state, setState, initialState.current)

  const actions = {
    setTouched: actionBuilder.setTouched,
    setValues: actionBuilder.setValues,
    setErrors: actionBuilder.setErrros,
    setVisibles: actionBuilder.setVisibles,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm: actionBuilder.resetForm,
    setState,
  } as Actions<T>

  const validator = new Validator(Entity, state, actions, options)
  const handlerBuilder = new HandlerBuilder(
    name.current,
    actions,
    setState,
    validator,
    options,
    instance,
  )
  const submitHandler = handlerBuilder.createSubmitHandler()

  const handlers: Handlers = {
    // eslint-disable-next-line
    handleBlur: useCallback(handlerBuilder.createBlurHandler(), []),
    // eslint-disable-next-line
    handleChange: useCallback(handlerBuilder.createChangeHandler(), []),
    handleSubmit: submitHandler,
  }

  const toolBuilder = new ToolBuilder(handlers, state)

  actions.submitForm = submitHandler // attach submitHandler to action

  const result: Result<T> = {
    state,
    handlers,
    actions,
    handlerBuilder,
    instance,
    name: toolBuilder.createName(),
    error: toolBuilder.createError(),
  }
  return result
}
