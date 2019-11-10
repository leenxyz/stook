export type Action<S> = S | ((prevState: S) => S)
export type Trigger<A> = (value: A) => void