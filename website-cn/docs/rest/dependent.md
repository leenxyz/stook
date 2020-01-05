---
id: dependent
title: Dependent Fetching
sidebar_label: Dependent Fetching
---

很多时候，一个请求会依赖另外一个请求的数据，这时候请求会有前后顺序，stook-rest 可以非常优雅的处理这种依赖请求：

```jsx
import React from 'react'
import { config, useFetch } from 'stook-rest'

export default () => {
  const { data: todos } = useFetch('/todos')

  const { loading, data: todo } = useFetch('/todos/:id', {
    params: () => ({ id: todos[9].id }),
  })

  if (loading) return <div>loading....</div>

  return (
    <div className="App">
      <div>Todo:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}
```

我们知道，`params`、`query`、`body` 三中参数值通常是一个对象，其实他们也可以是一个函数，函数参数可以让我们轻易地使用依赖请求。

依赖请求的方式可以大大地减少你的代码量，并让你可以用类似同步的代码书写数据请求代码。

[![Edit sweet-lake-gu2el](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sweet-lake-gu2el?fontsize=14&hidenavigation=1&theme=dark)
