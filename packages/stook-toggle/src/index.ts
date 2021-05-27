import { useStore } from 'stook';
import { useRef, useState } from 'react';

const FALSE_AS_ANY: any = false;

export function useToggle<S = any>(
  key: string,
  initialState: S | [S, S] = FALSE_AS_ANY
): [S, () => any] {
  let tuple: any[] = [];

  if (typeof initialState === undefined) {
    tuple = [false, true];
  } else if (Array.isArray(initialState)) {
    tuple = initialState;
  } else {
    tuple = [initialState, !initialState];
  }

  const tupleContainer = useRef<[S, S]>(tuple as any);
  const [state, setState] = useStore<S>(key, tuple[0]);
  const [index, setIndex] = useState(1);

  function toggle() {
    setState(tupleContainer.current[index]);
    setIndex(index => (index === 0 ? 1 : 0));
  }

  return [state, toggle];
}
