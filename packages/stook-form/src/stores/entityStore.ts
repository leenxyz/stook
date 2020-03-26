class EntityStore {
  private key = Symbol('stook#entiy-form')

  set(entityClass: any, name: string = '') {
    Reflect.defineMetadata(this.key, name, entityClass)
  }

  get(entityClass: any) {
    return Reflect.getMetadata(this.key, entityClass)
  }
}

export const entityStore = new EntityStore()
