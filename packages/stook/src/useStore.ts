import { useState, useEffect } from 'react';
import { GlobalStore } from './GlobalStore';
import { KeyStore } from './KeyStore';
import { Trigger, Action } from './types';

export function useStore<S>(
  key: string,
  initialState: S | (() => S)
): [S, Trigger<Action<S>>];

export function useStore<S = undefined>(
  key: string
): [S | undefined, Trigger<Action<S>>];

export function useStore<S>(key: string, value?: S) {
  GlobalStore.set(key, new KeyStore<S>(value));

  const keyStore = GlobalStore.get(key);
  const [state, set] = useState<S>(keyStore.state);
  const { setters } = keyStore;

  useEffect(() => {
    setters.push(set);
    return () => {
      setters.splice(setters.indexOf(set), 1);
    };
  }, []);

  return [state, keyStore.setState];
}
