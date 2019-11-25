import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DevTool from './DevTool'
import { Counter } from './Counter'
import { Counter2 } from './Counter2'
import { useCounter } from './useCounter'

const App = () => {
  const { count } = useCounter()
  return (
    <div>
      {count}
      <Counter></Counter>
      <Counter2></Counter2>
      <DevTool></DevTool>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
