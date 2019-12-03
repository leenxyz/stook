---
id: config
title: 配置
sidebar_label: 配置
---

## 全局配置

你可以使用 `config` 方法进行全局配置，全局配置将在每个请求生效：

```tsx
import { config } from 'stook-rest'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    foo: 'bar',
  },
})
```

## 配置选项

**`baseURL`**: string

Restful Api 服务器 baseURL， 默认为当前前端页面 host。

**`headers`**: object

每个请求都会带上的请求头，默认为 `{ 'content-type': 'application/json; charset=utf-8' }`

## Creating an instance

在某些应用场景，你可以能有多个后端服务，这时你需要多个 Client 实例：

```js
const client = new Client({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    foo: 'bar',
  },
})

client.fetch('/todos').then(data => {
  console.log(data)
})
```

创建实例后，你同样可以调用这些 Api:

- fetch
- useFetch
- useUpdate
