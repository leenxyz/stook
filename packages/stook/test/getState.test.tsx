import { renderHook } from '@testing-library/react-hooks'
import { useStore, getState } from '../src'

describe('mutate', () => {
  it('none state', () => {
    const count = getState('Counter1')
    expect(count).toBeUndefined()
  })

  it('can get state', () => {
    const {} = renderHook(() => useStore('Counter2', 2))
    const count = getState('Counter2')
    expect(count).toBe(2)
  })
})
