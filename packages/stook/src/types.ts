export type Action<S> = S | ((prevState: S) => S) | ((prevState: S) => void)
export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A) => void

export enum Key {
  Counter = 'Counter',
  Counter2 = 'Counter2',
  User = 'User',
  User2 = 'User2'
}
