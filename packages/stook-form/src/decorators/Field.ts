import { fieldStore } from '../stores/fieldStore'

// TODO
type Enum =
  | Array<{
      value: any
      label: string
    }>
  | any

export interface FieldOption {
  label?: string
  defaultValue?: any
  visible?: boolean
  enum?: Enum
  component?: any
}

export interface Value {
  name: string
  isRef: boolean
  ref?: any
  label?: string
  defaultValue?: any
  visible?: boolean
  display?: boolean
  index?: number
  component?: any
}

export declare type TypeFn = (returns?: void) => any

export function Field(opt?: FieldOption): PropertyDecorator
export function Field(typeFn?: TypeFn, opt?: FieldOption): PropertyDecorator
export function Field(typeFn?: any, opt?: any): PropertyDecorator {
  return (target, propertyKey: string) => {
    const isRef = typeof typeFn === 'function'
    opt = isRef ? opt : typeFn

    const value: Value = { ...opt, isRef, name: propertyKey }

    if (isRef) value.ref = typeFn()

    fieldStore.set(target, propertyKey, value)
  }
}
