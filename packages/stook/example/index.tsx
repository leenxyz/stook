import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useStore } from './src'
import { join } from 'path'

const Counter = () => {
  const [count, setCount] = useStore('COUNTER', 0)
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Counter></Counter>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
