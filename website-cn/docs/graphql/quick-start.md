---
id: quick-start
title: Quick start
sidebar_label: Quick start
---

stook-graphql 一个基于 hooks 实现的 Graphql 数据请求工具。

## 安装

```bash
npm i stook-graphql
```

## 获取数据

下面展示如何快速获取 GraphQL Api 数据。你就可以使用 `stook-graphql` 提供的一个 hooks `useQuery`来获取远程服务器数据。

```tsx
import { useQuery } from 'stook-graphql'

interface User {
  userOne: {
    _id: string
    name: string
    gender: string
    age: number
  }
}

const User = () => {
  const { loading, data, error } = useQuery<User>(GET_USER)

  if (loading) return <div>loading....</div>
  if (error) return <div>error!</div>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

当然，这只是 `useQuery` 最基本功能，如果你想深入了解它的其他功能，比如 refetch、retry 等高级功能，你看详情阅读 `useQuery` Api。

## 下一步

上面就是用获取数据最简单的例子，如果你要深入了解如何使用 `stook-graphql`，建议细看：

- [获取数据](/docs/graphql/useQuery): 深入了解 `useFetch` 的使用
- [更新数据](/docs/graphql/useMutation): 深入了解 `useMutation` 的使用
- [网络请求](/docs/graphql/query): 深入了解 `query` 的使用
