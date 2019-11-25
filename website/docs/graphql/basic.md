---
id: basic
title: 简介
sidebar_label: 简介
---

有人说，GraphQL 是未来，这里不讨论 GraphQL 和 RESTful 谁更优秀。Pea 对 GraphQL 和 RESTful 都有很好的支持。如果你愿意，你可以在项目中同时使用两者。

`stook-graphql`和 `stook-rest`一样，推崇在组件内获取并维护异步数据。

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

这是 Pea 中最简单的 GraphQL 用法，下面章节你会学习到如何配置 endpoint、refetch、mutate 等更多详细的用法。
