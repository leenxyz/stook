import { useState } from 'react'
import { Options } from '@peajs/request'
import { fetch } from './fetch'
import { Update, UpdateResult } from './types'

function getOptions(options?: Options): Options {
  const defaultOpt = { method: 'POST' } as Options
  if (!options) return defaultOpt
  return { ...defaultOpt, ...options }
}

export const useUpdate = <T = any>(url: string, options?: Options) => {
  const initialState = {} as UpdateResult<T>
  const [result, setState] = useState(initialState)

  const updateData = async (updateOptions?: Options) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      let opt = getOptions(options)
      if (updateOptions) opt = { ...opt, ...updateOptions }

      const data: T = await fetch(url, opt)
      setState(prev => ({ ...prev, loading: false, data }))
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error }))
    }
  }

  const update = (updateOptions?: Options): any => {
    updateData(updateOptions)
  }

  const out: [Update, UpdateResult<T>] = [update, result]

  return out
}
