import { fieldStore } from '../stores/fieldStore'
import { Options } from '../types'
import deepmerge from 'deepmerge'

function getValuesFromMetadata(instance: any) {
  const fields = fieldStore.get(instance)

  return fields.reduce((result, cur) => {
    if (!cur.isRef) {
      result[cur.name] = cur.defaultValue
      return result
    }

    const isAry = Array.isArray(cur.ref)
    const Ref = isAry ? cur.ref[0] : cur.ref
    const refFields = fieldStore.get(new Ref())

    const refData = refFields.reduce((r, i) => {
      r[i.name] = i.defaultValue
      return r
    }, {} as any)
    result[cur.name] = isAry ? [refData] : refData

    return result
  }, {} as any)
}

export function getInitialValues(instance: any, options: Options) {
  const values = getValuesFromMetadata(instance)
  if (!options.initValues) return values
  return deepmerge<any>(values, options.initValues(instance) || {})
}
