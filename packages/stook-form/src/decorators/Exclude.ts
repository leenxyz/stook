import { StookForm } from '../StookForm'

type Fn<T> = (values: T) => boolean

export function Exclude<T>(fn: Fn<T>): PropertyDecorator {
  return (target, propertyKey) => {
    StookForm.updateExcludeMaps(target, propertyKey, fn)
  }
}
