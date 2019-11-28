---
id: use-store
title: useStore
sidebar_label: useStore
---

`const [state, setState] = useStore(key, initialState)`

`useStore` 是 stook 的核心 Api，上面的例子展示它的基本用法。实际上，和 `useState` 相比， `useStore` 除了多了一个参数以外，其他用法一模一样，不同的是他们实现的效果：`useState` 的状态是局部的，`useStore` 的状态全局的。

还一个不同的是，`useStore` 内置了 immer，所以你可以有以下的用法：

```jsx
const [user, setUser] = useStore('[User]', { id: 1, name: 'foo' })

setUser(state => {
  state.name = 'bar'
})
```

还一个指得注意的是，如果你对同一个 key 进行了 initialState 的初始化，stook 只会使用第一个 initialState。

在某个组件初始化了 `[User]` store:

```jsx
// component A
const [user, setUser] = useStore('[User]', { id: 1, name: 'foo' })
```

后续，如果再初始化 `[User]` store 是无效的，因为这个 `[User]` store 已经初始化过了，所以这时你不用再传 initialState 参数。

```jsx
// component B
const [user, setUser] = useStore('[User]', { id: 1, name: 'bar' }) // bad

const [user, setUser] = useStore('[User]') // good，直接读取 store
```

如果你提前使用 mutate 初始化过一个 store，后续 `useStore` 一样不用再传 initialState 参数。
