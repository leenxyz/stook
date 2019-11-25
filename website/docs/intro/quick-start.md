---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

<span className="name">
  stook
</span>，也许，这是世界上最简单的 React 状态管理库，它会彻底颠覆你写 React 代码的方式。

## 基本用法

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

[![Edit ancient-night-gyres](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ancient-night-gyres?fontsize=14&hidenavigation=1&theme=dark)

`stook` 最核心的 Api 就是 `useStore`，也许你发现了，它和 `useState` 非常像，实际上，`useStore` 除了多了一个参数以外，其他用法一模一样。
