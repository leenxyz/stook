import { renderHook, act } from '@testing-library/react-hooks';

import { useStore, mutate } from '../src';

describe('mutate', () => {
  it('counter', () => {
    const { result } = renderHook(() => useStore('COUNTER', 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      mutate('COUNTER', 10);
    });

    expect(result.current[0]).toBe(10);
  });
});
