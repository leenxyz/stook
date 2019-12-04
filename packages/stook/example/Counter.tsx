import * as React from 'react'

import { useStore, mutate } from './src'

mutate('Counter', 10)

export const Counter = () => {
  const [count, setCount] = useStore('Counter')
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
