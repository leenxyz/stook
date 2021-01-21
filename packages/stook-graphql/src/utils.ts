import { parse } from 'graphql'
import { useRef, useCallback, EffectCallback, useEffect } from 'react'
import { Options, Deps } from './types'

export function isFalsy(value: any) {
  if (typeof value === 'boolean') {
    return !value
  }

  return value === undefined || value === null
}

export const getDeps = (options?: Options<any, any>): Deps => {
  if (options && Array.isArray(options.deps)) return options.deps
  return []
}
export function isResolve(arg: any) {
  if (!arg) return true
  if (typeof arg !== 'function') return true
  try {
    arg()
    return true
  } catch (error) {
    return false
  }
}

export const getVariables = (options: Options<any, any>): any => {
  if (!options.variables) return {}

  if (typeof options.variables !== 'function') return options.variables
  try {
    return options.variables({})
  } catch (error) {
    return false
  }
}

/**
 * transfrom deps to object
 * ['a', 'b', 'c'] => {0: 'a', 1: 'b', 2: 'c'}
 * @param deps
 */
export const getDepsMaps = (deps: Deps) => {
  return deps.reduce((result, cur, i) => {
    result[i] = cur
    return result
  }, {} as { [key: string]: any })
}

export function useUnmounted(): () => boolean {
  const unmountedRef = useRef<boolean>(false)
  const isUnmouted = useCallback(() => unmountedRef.current, [])

  useEffect(() => {
    unmountedRef.current = false
    return () => {
      unmountedRef.current = true
    }
  })

  return isUnmouted
}

export const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, [])
}

export const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn)

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}

export const getOperationName = (input: string) => {
  try {
    return (parse(input).definitions[0] as any).name.value
  } catch (error) {
    return null
  }
}
