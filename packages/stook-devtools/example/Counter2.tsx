import * as React from 'react'

import { useCounter } from './useCounter'

export const Counter2 = () => {
  const { count, increase, decrease } = useCounter()

  return (
    <div>
      <button onClick={decrease}>-</button>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </div>
  )
}
