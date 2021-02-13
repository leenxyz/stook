---
id: config
title: Config
sidebar_label: Config
---

## 全局配置

你可以使用 `config` 方法进行全局配置，全局配置将在每个请求生效：

```tsx
import { config } from 'stook-graphql'

config({
  endpoint: 'https://graphql-compose.herokuapp.com/user',
  headers: {
    foo: 'bar',
  },
})
```

## 配置选项

**`endpoint`**: string

GraphQL Client 服务器端点， 默认为 /graphql。

**`headers`**: object

每个请求都会带上的请求头，默认为 `{ 'content-type': 'application/json; charset=utf-8' }`

## Creating an instance

在某些应用场景，你可以能有多个后端服务，这时你需要多个 Client 实例：

```js
const client = new Client({
  endpoint: 'https://graphql-compose.herokuapp.com/user',
  headers: {
    foo: 'bar',
  },
})
```

创建实例后，你同样可以调用这些 Api:

- query
- useQuery
- useMutation
- useSubscription
