import { Touched } from '../types'

/**
 * make field touched 
 * TODO: handle array
 * @param values state object
 */
export function touchAll<T>(values: T): Touched<T> {
  const touched = {} as any
  for (let key in values) {
    const value = values[key]
    const isObject = typeof value === 'object' && value !== null
    touched[key] = isObject ? touchAll(value) : true
  }
  return touched
}
