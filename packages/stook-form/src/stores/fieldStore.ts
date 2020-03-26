import { FieldValue } from '../types'

class FieldStore {
  set(target: Object, name: string, value: FieldValue) {
    const values: any[] = this.get(target) || []
    values.push(value)
    Reflect.defineMetadata('field', values, target)
  }

  get(target: any): FieldValue[] {
    return Reflect.getMetadata('field', target)
  }
}

export const fieldStore = new FieldStore()
