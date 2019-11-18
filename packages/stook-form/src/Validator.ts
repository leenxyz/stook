import { validateOrReject, ValidationError } from 'class-validator'
import isPromise from 'is-promise'
import deepmerge from 'deepmerge'
import { plainToClass } from 'class-transformer'
import set from 'lodash.set'
import { Errors, State, Actions, Options } from './types'

export class Validator<T> {
  constructor(
    private Model: any,
    private state: State<T>,
    private actions: Actions<T>,
    private options: Options<T>,
  ) {}

  // TODO: may be should expose all error
  private formatErrorsFromMeta(
    validateMetaErrors: ValidationError[],
    errors: any = {},
    parentKey: string = '',
  ): Errors<T> {
    for (const error of validateMetaErrors) {
      let { property } = error
      if (error.children.length) {
        this.formatErrorsFromMeta(error.children, errors, property)
      } else {
        const errorValues = Object.values(error.constraints)
        const key = parentKey ? `${parentKey}.${property}` : property
        set(errors, key, errorValues[0])
      }
    }
    return errors
  }

  // class-validator validate
  private async runValidateMeta() {
    const values: any = plainToClass(this.Model, this.state.values)
    try {
      await validateOrReject(values)
      return {} as Errors<T>
    } catch (errors) {
      return this.formatErrorsFromMeta(errors)
    }
  }

  private async runValidateFn(): Promise<Errors<T>> {
    const { options, state, actions } = this
    if (!options.validate) return {}

    // function validate
    let validateFnErrors = options.validate(state.values, { state, actions })

    // sync validate
    if (!isPromise(validateFnErrors)) {
      return validateFnErrors
    }

    try {
      return await validateFnErrors
    } catch {
      return {}
    }
  }

  validateForm = async (): Promise<Errors<T>> => {
    const [error1, error2] = await Promise.all([this.runValidateMeta(), this.runValidateFn()])
    return deepmerge<Errors<T>>(error1, error2)
  }
}
