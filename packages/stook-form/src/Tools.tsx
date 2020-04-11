export class Tools {
  static componetStore: any = {}
  static formComponent: any

  /**
   *
   * @param name componentName
   * @param component
   * @example
   *
   */
  static registerField(name: string, component: any) {
    this.componetStore[name] = component
  }

  static registerForm(component: any) {
    this.formComponent = component
  }
}

export const registerField = Tools.registerField
