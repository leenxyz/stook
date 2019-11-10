import { useState } from 'react'
import { query } from './query'
import { Options, Mutate, MutateResult, Variables } from './types'

export const useMutate = <T = any>(input: string, options: Options = {}) => {
  const initialState = { loading: true } as MutateResult<T>
  const [result, setState] = useState(initialState)

  const fetchData = async (opt: Options = {}) => {
    try {
      const data = await query<T>(input, { ...options, ...opt } || {})
      setState(prev => ({ ...prev, loading: false, data }))
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error }))
    }
  }

  const mutate = (variables: Variables, opt: Options = {}): any => {
    setState(prev => ({ ...prev, loading: true }))
    fetchData({ ...opt, variables })
  }

  const out: [Mutate, MutateResult<T>] = [mutate, result]

  return out
}
