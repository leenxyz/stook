---
id: quick-start
title: 快速开始
sidebar_label: 快速开始
---

## 配置 Rest Client

首先，你需要配置 GraphQL Client，通常包括端点 (endpoint) 和 headers 等。如下，修改配置文件 `config/config.default`:

```tsx
// config/config.default
const config = {
  graphql: {
    endpoint: 'https://graphql-compose.herokuapp.com/user',
  },
}

export default config
```

注意，你不需要手动初始化 graphQL Client，你只需要更新配置文件，Pea 会帮你初始化。

## 获取数据

配置好端点后，你就可以使用 `stook-rest` 提供的一个 hooks `useFetch`，来获取远程服务器数据。下面是获取 todos 列表并渲染到组件，可以看到，代码相当简洁：

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

当然，这只是 `useFetch` 最基本功能，如果你想深入了解它的其他功能，比如 refetch、retry 等高级功能，你看详情阅读 `useFetch` Api。

## Rest Client 配置选项

**`endpoint`**: string

GraphQL Client 服务器端点， 默认为 `/graphql`。

**`headers`**: object

每个请求都会带上的请求头，默认为 `{ 'content-type': 'application/json; charset=utf-8' }`

## 下一步

上面就是 Pea 使用 GraphQL 获取数据最简单的例子，如果你要深入了解如何使用 `stook-graphql`，建议细看：

- [获取数据](/docs/graphql/useQuery): 深入了解 `useQuery` 的使用
- [更新数据](/docs/graphql/useMuate): 深入了解 `useQuery` 的使用
- [网络请求](/docs/graphql/query): 深入了解 `query` 的使用
