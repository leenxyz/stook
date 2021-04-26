---
id: middleware
title: Middleware
sidebar_label: Middleware
---

## 中间件用法

为了方便的方便的拦截请求，stook-graphql 提供了中间件机制。

```js
import { applyMiddleware } from 'stook-graphql'

// add a middleware
applyMiddleware(async (ctx, next) => {
  ctx.headers.Authorization = `bearer token...`
  await next()
  ctx.body = { data: ctx.body }
})

// add another middleware
applyMiddleware(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = { error: ctx.body }
  }
})
```

## 中间件机制

stook-graphql 的机制和 [koa](https://github.com/koajs/koa) 类似，都是洋葱模型。

每个中间件是一个 async 函数，类型定义如下：

```ts
type Middleware = (ctx: Ctx, next: () => Promise<any>) => anyjs

type NextFn = () => Promise<any>

interface Ctx {
  headers: {
    [key: string]: string
  }
  body: any
}
```

## 使用场景

下面是一些实际应用场景的例子：

**为所有请求添加 token**

```js
applyMiddleware(async (ctx, next) => {
  ctx.headers.Authorization = `bearer my_token_qazxsw`
  await next()
})
```

**格式化 response**

```js
applyMiddleware(async (ctx, next) => {
  await next()
  ctx.body = {
    code: 0,
    data: ctx.body,
    msg: 'fetch data success',
  }
})
```

**统一错误处理**

```js
applyMiddleware(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    throw {
      code: 1,
      error: error,
      msg: 'fetch data error',
    }
  }
})
```
