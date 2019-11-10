import { GlobalStore } from './GlobalStore';

export function mutate<S>(key: string, value?: S) {
  const keyStore = GlobalStore.get(key);
  keyStore.setState(value);
}
