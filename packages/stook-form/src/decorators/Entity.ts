import { entityStore } from '../stores/entityStore'

export function Entity(name: string): ClassDecorator {
  return target => {
    entityStore.set(target, name)
  }
}
