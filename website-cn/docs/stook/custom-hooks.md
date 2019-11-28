---
id: custom-hooks
title: Custom hooks
sidebar_label: Custom hooks
---

为了能使组件和状态管理逻辑分离，强烈建议使用自定义 hooks 管理状态，比如说你要管理 Counter 的状态，那就是自定义一个叫 `useCounter` 的 hooks，然后在各组件中使用 `useCounter()`， 而不是直接使用 `useStore('Counter')`。

示例：

```jsx
import React from 'react'
import { useStore } from 'stook'

function useCounter() {
  const [count, setCount] = useStore('[Counter]', 0)
  const decrease = () => setCount(count - 1)
  const increase = () => setCount(count + 1)
  return { count, increase, decrease }
}

function Display() {
  const { count } = useCounter()
  return <div>{count}</div>
}

function Increase() {
  const { increase } = useCounter()
  return <buttun onClick={increase}>+</buttun>
}

function Decrease() {
  const { decrease } = useCounter()
  return <buttun onClick={decrease}>-</buttun>
}

export default function App() {
  return (
    <div>
      <Decrease />
      <Display />
      <Increase />
    </div>
  )
}
```

[![Edit nameless-shadow-ozke5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nameless-shadow-ozke5?fontsize=14&hidenavigation=1&theme=dark)

上面三个子组件，都用到了 useCounter，它们实现了状态共享。
