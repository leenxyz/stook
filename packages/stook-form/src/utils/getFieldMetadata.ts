import { fieldStore } from '../stores/fieldStore'

export function getFieldMetadata(instance: any) {
  const fields = fieldStore.get(instance)

  return fields.reduce((result, cur) => {
    if (!cur.isRef) {
      result[cur.name] = cur
      return result
    }
    const isAry = Array.isArray(cur.ref)
    const Ref = isAry ? cur.ref[0] : cur.ref
    const refFields = fieldStore.get(new Ref())

    const refData = refFields.reduce((r, i) => {
      r[i.name] = { ...i, name: `${cur.name}.${i.name}` }
      return r
    }, {} as any)
    result[cur.name] = isAry ? [refData] : refData

    return result
  }, {} as any)
}
