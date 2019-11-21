import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { useStore } from 'stook'
import { useStore, mutate } from '../src'
import Fetch from './Fetch'
import DevTool from './DevTool'

setTimeout(() => {
  mutate('COUNTER', 10)
}, 1000)

const Counter = () => {
  const [count, setCount] = useStore('COUNTER', 0)
  const [project, setProject] = useStore('project', { foo: 'bar', id: 10 })
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>

      <pre>{JSON.stringify(project, null, 2)}</pre>
      <button
        onClick={() =>
          setProject(project => {
            return { foo: 'foo', id: 10 }
            // project.foo = 'foo'
          })
        }
      >
        update project
      </button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Counter></Counter>
      {/* <Fetch></Fetch> */}
      <DevTool></DevTool>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
