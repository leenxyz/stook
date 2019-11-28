---
id: quick-start
title: 快速开始
sidebar_label: 快速开始
---

## 配置 Rest Client

首先，你需要配置 Rest Client，通常包括 Rest Api 的端点 (endpoint) 和 headers 等。如下，修改配置文件 `config/config.default`:

```tsx
// config/config.default
const config = {
  rest: {
    endpoint: 'https://jsonplaceholder.typicode.com',
    // headers: {/* header config */}
  },
}

export default config
```

注意，你不需要手动初始化 Rest Client，你只需要更新配置文件，Pea 会帮你初始化。

## 获取数据

配置好端点后，你就可以使用 `stook-rest` 提供的一个 hooks `useFetch`，来获取远程服务器数据。下面是获取 todos 列表并渲染到组件，可以看到，代码相当简洁：

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
      {items.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
```

当然，这只是 `useFetch` 最基本功能，如果你想深入了解它的其他功能，比如 refetch、retry 等高级功能，你看详情阅读 `useFetch` Api。

## Rest Client 配置选项

**`endpoint`**: string

Rest Api 服务器端点， 默认为当前前端页面 host。

**`headers`**: object

每个请求都会带上的请求头，默认为 `{ 'content-type': 'application/json; charset=utf-8' }`

## 下一步

上面就是 Pea 使用 Rest Api 获取数据最简单的例子，如果你要深入了解如何使用 `stook-rest`，建议细看：

- [获取数据](/docs/rest/useFetch): 深入了解 `useFetch` 的使用
- [更新数据](/docs/rest/useUpdate): 深入了解 `useUpdate` 的使用
- [网络请求](/docs/rest/fetch): 深入了解 `fetch` 的使用
