import { HandlerBuilder } from './builders/HandlerBuilder'
import { State, Handlers, Actions } from './types'

export type Creator = <T>({
  name,
  handlerBuilder,
  state,
  handlers,
  actions,
}: {
  name: string
  handlerBuilder: HandlerBuilder<T>
  state: State<T>
  handlers: Handlers
  actions: Actions<T>
}) => any

type Name = 'help' | 'name' | 'error'
export interface ExcludeItem {
  propertyKey: string
  fn: any
}

export class StookForm {
  static excludeMaps = new WeakMap<object, ExcludeItem[]>()
  static helpCreator: any = null
  static nameCreator: any = null
  static errorCreator: any = null
  static componetStore: any = {}

  static updateExcludeMaps(target: any, propertyKey: any, fn: any) {
    if (this.excludeMaps.get(target)) {
      const excludes = this.excludeMaps.get(target)
      if (excludes) {
        excludes.push({ propertyKey, fn })
      }
    } else {
      this.excludeMaps.set(target, [{ propertyKey, fn }])
    }
  }

  /**
   *
   * @param name componentName
   * @param cmp
   */
  static registerComponent(name: string, cmp: any) {
    this.componetStore[name] = cmp
  }

  /**
   *
   * @param toolName tool name
   * @param creator tool function to override Component
   */
  static register(toolName: Name, creator: Creator) {
    // override help
    if (toolName === 'help') {
      StookForm.helpCreator = creator
    }
    // override name
    if (toolName === 'name') {
      StookForm.nameCreator = creator
    }

    // override name
    if (toolName === 'name') {
      StookForm.errorCreator = creator
    }
  }
}
