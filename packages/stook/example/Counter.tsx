import * as React from 'react'

import { useStore } from './src'

// setTimeout(() => {
//   mutate('COUNTER', 10)
// }, 1000)

export const Counter = () => {
  const [count, setCount] = useStore('COUNTER')
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
