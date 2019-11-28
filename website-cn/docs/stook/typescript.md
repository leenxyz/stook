---
id: typescript
title: Typescript
sidebar_label: Typescript
---

我是 TypeScript 的忠实拥泵，创建 Stook 的初衷之一这就是完美地支持 TypeScript。得益于 React Hooks 对 TypeScript 完备的支持，Stook 也完美地支持 TypeScript。

## useStore

和 `useState` 一样，`useStore` 能根据 initialState 推导 state 的类型：

```jsx
const [user, setUser] = useStore('[User]', { id: 1, name: 'foo' })
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

const [user, setUser] = useStore<User>('[User]', { id: 1, name: 'foo' })
```

## mutate

使用泛型声明 mutate 的类型:

```ts
interface User {
  id: number
  name: string
}

mutate<User>('[User]', user => {
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

const user = getState<User>('[User]')
```
