import { Dispatch, SetStateAction } from 'react';
import { produce } from 'immer';

export class KeyStore<S = any> {
  state: S;
  setters: Dispatch<SetStateAction<S>>[] = [];
  constructor(value: any) {
    this.state = value;
  }

  // TODO: handle any
  setState = (value: any) => {

    // TODO: should be warning
    const notUseImmer =
      typeof value !== 'function' ||
      typeof this.state !== 'object' ||
      !!value({ ...this.state });

    if (notUseImmer) {
      this.state = value;
      this.setters.forEach(setter => setter(this.state));
      return;
    }

    const nextState = produce(this.state, draft => {
      value(draft);
    });
    this.state = nextState;
    this.setters.forEach(setter => setter(nextState));
  };
}
