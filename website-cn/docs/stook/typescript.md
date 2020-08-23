---
id: typescript
title: Typescript
sidebar_label: Typescript
---

我是 TypeScript 的忠实拥泵，创建 Stook 的初衷之一这就是完美地支持 TypeScript。得益于 React Hooks 对 TypeScript 完备的支持，Stook 也完美地支持 TypeScript。

## Store key

```Stook``` 的核心 Api 只有3个：useStore、getState、mutate，它们的共同点之一就是第一个参数是 store 的唯一key，默认 key 可以是任何字符串，如果我们想在编辑器中获得智能提示，我们可以这样去实现：

在项目根目录新建文件 ```index.d.ts```，添加类似下面内容：
```ts
import stook from 'stook'

declare module 'stook' {
  interface Key {
    User: string
    Counter: string
  }
}
```
这样你使用 useStore、getState、mutate 就可以获得智能提示。原理其实就是用了 TypeScript 的 [declaration-merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)。


## useStore

和 `useState` 一样，`useStore` 能根据 initialState 推导 state 的类型：

```jsx
const [user, setUser] = useStore('User', { id: 1, name: 'foo' })
```

上面代码会自动推导出 user 的类型为：

```ts
interface User {
  id: number
  name: string
}
```

当然，你也可以通过泛型显示地声明类型：

```ts
interface User {
  id: number
  name: string
}

const [user, setUser] = useStore<User>('User', { id: 1, name: 'foo' })
```

## mutate

使用泛型声明 mutate 的类型:

```ts
interface User {
  id: number
  name: string
}

mutate<User>('User', user => {
  user.name = 'bar'
})
```

## getState

使用泛型声明 getState 的类型:

```ts
interface User {
  id: number
  name: string
}

const user = getState<User>('User')
```
