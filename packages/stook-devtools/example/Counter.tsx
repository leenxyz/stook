import * as React from 'react'

import { useStore } from 'stook'


export const Counter = () => {
  const [count, setCount] = useStore('COUNTER', 0)
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
