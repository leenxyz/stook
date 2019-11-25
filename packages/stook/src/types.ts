export type Action<S> = S | ((prevState: S) => S) | ((prevState: S) => void)
export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A) => void
