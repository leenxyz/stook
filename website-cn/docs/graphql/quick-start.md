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
