---
id: quick-start
title: Quick start
sidebar_label: Quick start
---

## Installation

### Install with npm

```bash
npm install stook
```

### Install with yarn

```bash
yarn add stook
```

## Usage

下面是一个经典的 Counter 组件，展示了 `stook` 的最基本用法:

```tsx
import React from 'react'
import { useStore } from 'stook'

function Counter() {
  const [count, setCount] = useStore('Counter', 0)
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
