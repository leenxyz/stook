---
id: fetch
title: fetch
sidebar_label: fetch
---

大部分情况下，建议使用 `useFetch` 获取数据。不过有些场景，你不需要在维护异步数据的状态，你只需要发送普通的网络请求。

比如，点击一个按钮提交表单，执行一个更新操作：

**todoService.ts**

```jsx
import { createStore } from 'stook-store'
import { fetch } from 'stook-rest'

export async function fetchTodos() {
  return await fetch('/todos')
}
```

stook-rest 的 `fetch` 和原生的 Api Fetch (https://github.github.io/fetch/)非常类似，但又有一些区别。

那 stook-rest 的 `fetch` 和原生 `fetch`有什么区别呢？

## 直接返回数据

```js
const todos = await fetch('/todos')
```

上面的 todos 就是服务器的数据，你可以指定如何处理远程数据：

```js
const todos = await fetch('/todos', { type: 'text' })
```

type 是可选的，默认为 'json'，类型为 `type Type = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'`

## Request body 支持 JS 对象

```js
const todos = await fetch('/todos', {
  method: 'POST',
  body: {
    title: 'do something',
  },
})
```

## 支持 query 参数

```js
const todos = await fetch('/todos', {
  query: {
    pageSize: 10,
    pageNum: 1,
  },
})
```

将请求 `/todos?pageSize=10&pageNum=1`，甚至你可以使用嵌套的 query 对象。

## 支持 params 参数

```js
const todos = await fetch('/todos/:id', {
  params: { id: 1 },
})
```

处理这些不一样，其他参数跟原生 `fetch`保持一致，详情请看文档：https://github.github.io/fetch 。
