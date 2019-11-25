---
id: share-state
title: Share state
sidebar_label: Share state
---

对于状态管理，最核心的功能就是状态的跨组件通信。useState 用于管理单一组件内的状态，useStore 则可以跨组件管理整个应用的状态。

下面展示了如何多个组件如何共享状态：

```jsx
import React from 'react'
import { useStore } from 'stook'

function Counter() {
  const [count, setCount] = useStore('COUNTER', 0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

function Display() {
  const [count] = useStore('COUNTER')
  return (
    <div>
      <p>{count}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <Counter />
      <Display />
    </div>
  )
}
```

在这个例子中，我们可以看到，要共享状态，只需使用 useStore 订阅已 key 即可，非常简单。可以说，只要你学会了 useState，也就学会了 useStore，只要你学会了 useStore，你就学会了 React 的状态管理。
