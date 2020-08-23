import { renderHook } from '@testing-library/react-hooks'
import { useStore, getState, Key } from '../src'

describe('mutate', () => {
  it('none state', () => {
    const count = getState(Key.Counter1)
    expect(count).toBeUndefined()
  })

  it('can get state', () => {
    const {} = renderHook(() => useStore(Key.Counter2, 2))
    const count = getState(Key.Counter2)
    expect(count).toBe(2)
  })
})
