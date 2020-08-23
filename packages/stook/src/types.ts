export type Action<S> = S | ((prevState: S) => S) | ((prevState: S) => void)
export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A) => void

/**
 * limit stook store key
 */
export enum Key {
  Counter = 'Counter',
  Counter1 = 'Counter1',
  Counter2 = 'Counter2',
  User = 'User',
  User1 = 'User1',
  User2 = 'User2',
}
