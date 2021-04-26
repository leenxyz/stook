---
id: intro
title: Introduction
sidebar_label: Introduction
---

有人说，GraphQL 是未来，这里不讨论 GraphQL 和 RESTful 谁更优秀。`stook-graphql`和 `stook-rest`一样，推崇使用 hooks 获取并维护异步数据。

## 使用 `stook-graphql`

我们使用 `stook-rest` 的 `useFetch` 获取数据，可以轻松的拿到数据的状态 `{ loading, data, error }`，然后渲染处理：

```jsx
import React from 'react'
import { useQuery } from 'stook-graphql'

const GET_USER = `
  query User {
    userOne {
      _id
      name
      gender
      age
    }
  }
`
const User = () => {
  const { loading, data, error } = useQuery(GET_USER)

  if (loading) return <div>loading....</div>
  if (error) return <div>error!</div>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

这是最简单的 GraphQL 用法，下面章节你会学习到如何配置 endpoint、refetch、mutate 等更多详细的用法。
