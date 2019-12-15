---
id: useFetch
title: useFetch
sidebar_label: useFetch
---

> const result = useFetch(url, options)

以简单高效的方式获取和管理异步数据是 stook-rest 的核心功能。接下来，你将学习如何通过 `useFetch` 获取数据并渲染成 UI。

下面是一个示例，这里假设你已经配置好 client，如果不了解如何配置，请看 [配置](/docs/rest/config)。

## 使用 `useFetch`

```jsx
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

## URL（string）

HTTP 请求的 URL，eg: "/todos"。

### options

**`method?: Method`**

HTTP 请求的类型，默认为 `GET`, 全部可选值: `type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'`

```js
const { loading, data, error } = useFetch<Todo[]>('/todos', { method: 'POST' })
```

**`query?: Query`**

HTTP 请求的 query 对象，通常 `GET` 类型的请求比较常用。

```js
const { loading, data, error } = useFetch<Todo[]>('/todos', {
  query: { pageNum: 1, pageSize: 20 }
})
```

上面会把 url 转换为: `/todos?pageNum=1&pageSize=20`。详细的转换规则请参照 [qs](https://github.com/ljharb/qs)

**`body?: Body`**

HTTP 请求的 body 对象，和原生 `fetch` 的 [body](https://github.github.io/fetch/#request-body) 类似，不同的是，`useFetch` 的 body 支持 JS 对象：

```js
const { loading, data, error } = useFetch('/todos', {
  body: { title: 'todo1' },
})
```

**`params?: Params`**

URL 的参数对象，用法如下：

```js
const { loading, data, error } = useFetch('/todos/:id', {
  params: { id: 10 },
})
```

请求发送后， `/todos/:id` 会转换为 `/todos/10`。

**`headers?: HeadersInit;`**

HTTP 请求头，和原生`fetch`的 [`Headers`](https://github.github.io/fetch/#Headers) 一致，但有默认值: `{ 'content-type': 'application/json; charset=utf-8' }`

**`deps?: Deps`**

`useFetch` 是一个自定义的 React hooks，默认情况下，组件多次渲染，`useFetch` 只会执行一次，不过如果你设置了依赖 (deps)，并且依赖发生更新，`useFetch`会重新执行，就是会重新获取数据，其机制类似于 `useEffect` 的依赖，不同的是不设置任何依赖值时，当组件发生多次渲染，`useFetch` 只会执行一次，`useFetch` 执行多次。

依赖值 deps 是个数组,类型为：`type Deps = ReadonlyArray<any>`

**`key?: string`**

该请求的唯一标识符，因为 stook-rest 是基于 stook，这个 key 就是 stook 的唯一 key，对于 refetch 非常有用。默认是为 `${method} ${url}`，比如请求如下:

```js
const { loading, data } = useFetch('/todos', { method: 'POST' })
```

那默认的 key 为: `POST /todos`

## 结果 (Result)

**`loading: boolean`**

一个布尔值，表示数据是否加载中。

**`data: T`**

服务器返回的数据。

**`error: RestError`**

服务器返回错误。

**`refetch: <T>(options?: Options) => Promise<T>`**

重新发起一个请求获取数据，eg:

```tsx
const Todos = () => {
  const { loading, data, error, refetch } = useFetch<Todo[]>('/todos')

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
