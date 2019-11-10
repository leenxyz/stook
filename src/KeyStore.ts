import { Dispatch, SetStateAction } from 'react'

export class KeyStore<S = any> {
  state: S
  setters: Dispatch<SetStateAction<S>>[] = []
  constructor(value: any) {
    this.state = value
  }

  setState = (value: S) => {
    this.state = value
    this.setters.forEach(setter => setter(this.state))
  }
}
