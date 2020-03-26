interface Value {
  fn: (...args: any[]) => any
  target: Object
  propertyKey: string
}

class MethodStore {
  private key = Symbol('Method')

  set(fn: any, value: Value) {
    const oldValue = this.get(fn) || {}
    const newValue = { ...oldValue, ...value }
    Reflect.defineMetadata(this.key, newValue, fn)
  }

  get(fn: any): Value {
    return Reflect.getMetadata(this.key, fn)
  }
}

export const methodStore = new MethodStore()
