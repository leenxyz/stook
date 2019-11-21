import { renderHook } from '@testing-library/react-hooks'

import { useStore, getState } from '../src'

describe('mutate', () => {
  it('none state', () => {
    const count = getState('COUNTER1')
    expect(count).toBe(null)
  })

  it('can get state', () => {
    const {} = renderHook(() => useStore('COUNTER2', 2))
    const count = getState('COUNTER2')
    expect(count).toBe(2)
  })
})
