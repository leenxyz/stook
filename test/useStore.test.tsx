import { renderHook, act } from '@testing-library/react-hooks';

import { useStore } from '../src';

describe('useStore', () => {
  it('counter', () => {
    const { result } = renderHook(() => useStore('COUNTER', 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
  });
});
