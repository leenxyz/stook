---
id: quick-start
title: Quick start
sidebar_label:  Quick start
---

stook-rest 一个基于 hooks 实现的 Restful Api 数据请求工具。

## 安装

```bash
npm i stook-rest
```

## 获取数据

下面展示如何快速获取 Restful Api 数据。你就可以使用 `stook-rest` 提供的一个 hooks `useFetch`来获取远程服务器数据。下面是获取 todos 列表并渲染到组件，可以看到，代码相当简洁：

```tsx
import { useFetch } from 'stook-rest'

interface Todo {
  id: number
  title: string
  completed: boolean
}

const Todos = () => {
  const { loading, data, error } = useFetch<Todo[]>('/todos')

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
```

[![Edit bitter-frog-t2tbm](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bitter-frog-t2tbm?fontsize=14&hidenavigation=1&theme=dark)

当然，这只是 `useFetch` 最基本功能，如果你想深入了解它的其他功能，比如 refetch、retry 等高级功能，你看详情阅读 `useFetch` Api。

## 下一步

上面就是用获取数据最简单的例子，如果你要深入了解如何使用 `stook-rest`，建议细看：

- [获取数据](/docs/rest/useFetch): 深入了解 `useFetch` 的使用
- [更新数据](/docs/rest/useUpdate): 深入了解 `useUpdate` 的使用
- [网络请求](/docs/rest/fetch): 深入了解 `fetch` 的使用
