---
id: quick-start
title: Quick start
sidebar_label: Quick start
---

下面是一个经典的 Counter 组件，展示了 `stook` 的最基本用法:

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
```

`stook` 最核心的 Api 就是 `useStore`，也许你发现了，它和 `useState` 非常像，实际上，`useStore` 除了多了一个参数以外，其他用法一模一样。
