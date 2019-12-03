---
id: quick-start
title: 快速开始
sidebar_label: 快速开始
---

## 获取数据

配置好 client 后，你就可以使用 `stook-graphql` 提供的一个 hooks `useGraphql`，来获取远程服务器数据。

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