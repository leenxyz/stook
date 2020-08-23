import { renderHook, act } from '@testing-library/react-hooks'

import { useStore, mutate, Key } from '../src'

describe('mutate', () => {
  it('inited', () => {
    const { result } = renderHook(() => useStore(Key.Counter1, 0))

    expect(result.current[0]).toBe(0)

    act(() => {
      mutate(Key.Counter1, 10)
    })

    expect(result.current[0]).toBe(10)
  })

  it('did not inited', () => {
    act(() => {
      mutate(Key.Counter2, 10)
    })

    const { result } = renderHook(() => useStore(Key.Counter2, 0))
    expect(result.current[0]).toBe(10)
  })
})
