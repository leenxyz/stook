export type Action<S> = S | ((prevState: S) => S) | ((prevState: S) => void);
export type Trigger<A> = (value: A) => void;
