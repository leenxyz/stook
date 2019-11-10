import { useState, useEffect } from 'react';
import { Storage } from './Storage';
import { Store } from './Store';
import { Trigger, Action } from './types';

export function useStore<S>(
  key: string,
  initialState: S | (() => S)
): [S, Trigger<Action<S>>];

export function useStore<S = undefined>(
  key: string
): [S | undefined, Trigger<Action<S>>];

export function useStore<S>(key: string, value?: S) {
  Storage.set(key, new Store<S>(value));

  const store = Storage.get(key);
  const [state, set] = useState<S>(store.state);
  const { setters } = store;

  useEffect(() => {
    setters.push(set);
    return () => {
      setters.splice(setters.indexOf(set), 1);
    };
  }, []);

  return [state, store.setState];
}
