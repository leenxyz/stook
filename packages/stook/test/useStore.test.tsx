import { renderHook, act } from '@testing-library/react-hooks'
import { useStore, Key } from '../src'

describe('useStore', () => {
  it('simplest', () => {
    const { result } = renderHook(() => useStore(Key.Counter, 0))

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[1](1)
    })
    expect(result.current[0]).toBe(1)

    act(() => {
      result.current[1](() => 2)
    })
    expect(result.current[0]).toBe(2)
  })

  it('setState(value)', () => {
    const { result } = renderHook(() => useStore(Key.User, { name: 'fo' }))

    expect(result.current[0].name).toBe('fo')

    act(() => {
      result.current[1]({ name: 'foo' })
    })
    expect(result.current[0].name).toBe('foo')

    // function
    act(() => {
      result.current[1](state => ({ ...state, name: 'fooo' }))
    })
    expect(result.current[0].name).toBe('fooo')

    // immer
    act(() => {
      result.current[1](state => {
        state.name = 'foooo'
      })
    })
    expect(result.current[0].name).toBe('foooo')
  })

  it('try init again', () => {
    const { result: result1 } = renderHook(() => useStore(Key.User2, { name: 'fo' }))
    const { result: result2 } = renderHook(() => useStore(Key.User2, { name: 'bar' }))

    expect(result1.current[0].name).toBe('fo')
    expect(result2.current[0].name).toBe('fo')
  })
})
