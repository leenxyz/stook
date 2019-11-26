import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Counter } from './Counter'
import { Counter2 } from './Counter2'
import { Todos } from './Todos'
import { devtools } from './src'


devtools.init()

const App = () => {
  return (
    <div>
      <Counter></Counter>
      <Counter2></Counter2>
      <Todos></Todos>
    </div>
  )
}

ReactDOM.render(<App></App>, document.getElementById('root'))
