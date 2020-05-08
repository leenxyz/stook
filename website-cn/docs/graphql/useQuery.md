---
id: useQuery
title: useQuery
sidebar_label: useQuery
---

> const result = useQuery(input, options)

以简单高效的方式获取和管理异步数据是 stook-query 的核心功能。接下来，你将学习如何通过 `useQuery` 获取数据并渲染成 UI。

下面是一个示例，这里假设你已经配置好 client，如果不了解如何配置，请看 [配置](/docs/graphql/config)。

## 使用 `useQuery`

```jsx
import React from 'react'
import { useQuery } from 'stook-graphql'

const GET_USER = `
  query User {
    userById(_id: "57bb44dd21d2befb7ca3f010") {
      name
      gender
      age
    }
  }
`

export default () => {
  const { loading, data, error } = useQuery(GET_USER)

  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

## input (string)

GraphQL 请求的字符串。

## options

**`variables: boolean`**

GraphQL 变量。

**`key?: string`**

该请求的唯一标识符，因为 stook-graphql 是基于 stook，这个 key 就是 stook 的唯一 key，对于 refetch 非常有用。默认是为 input。

**`headers?: HeadersInit;`**

HTTP 请求头，和原生`fetch`的 [`Headers`](https://github.github.io/fetch/#Headers) 一致，但有默认值: `{ 'content-type': 'application/json; charset=utf-8' }`

**pollInterval?: number**

轮询时间间隔

**lazy?: boolean**

默认不发请求，需要手动 start 触发，start 是 result 里面的方法。

**errRetryCount?: number**

错误重试次数

**timeout?: number**

超时时间(单位毫秒)

## 结果 (Result)

**`loading: boolean`**

一个布尔值，表示数据是否加载中。

**`data: T`**

服务器返回的数据。

**`error: GraphqlError`**

服务器返回错误。

**`refetch: <T>(options?: Options) => Promise<T>`**

重新发起一个请求获取数据。

**`start: <T>(options?: Options) => Promise<T>`**

手动触发一个请求获取数据，配合 lazy 使用。
