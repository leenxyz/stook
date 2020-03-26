import { fieldStore } from '../stores/fieldStore'

/**
 * 获取初始化的 visibles
 * @param instance
 */
export function getInitialVisibles(instance: any) {
  const fields = fieldStore.get(instance)

  return fields.reduce((result, cur) => {
    if (!cur.isRef) {
      result[cur.name] = typeof cur.visible === 'boolean' ? cur.visible : true
      return result
    }
    const isAry = Array.isArray(cur.ref)
    const Ref = isAry ? cur.ref[0] : cur.ref
    const refFields = fieldStore.get(new Ref())

    const refData = refFields.reduce((r, i) => {
      r[i.name] = typeof i.visible === 'boolean' ? i.visible : true
      return r
    }, {} as any)
    result[cur.name] = isAry ? [refData] : refData

    return result
  }, {} as any)
}
