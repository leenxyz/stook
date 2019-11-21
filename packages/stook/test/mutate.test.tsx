import { renderHook, act } from '@testing-library/react-hooks'

import { useStore, mutate } from '../src'

describe('mutate', () => {
  it('inited', () => {
    const { result } = renderHook(() => useStore('COUNTER1', 0))

    expect(result.current[0]).toBe(0)

    act(() => {
      mutate('COUNTER1', 10)
    })

    expect(result.current[0]).toBe(10)
  })

  it('did not inited', () => {
    act(() => {
      mutate('COUNTER2', 10)
    })

    const { result } = renderHook(() => useStore('COUNTER2', 0))
    expect(result.current[0]).toBe(10)
  })
})
