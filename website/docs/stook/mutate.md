---
id: mutate
title: mutate
sidebar_label: mutate
---

`mutate` 用来改变一个 store 的 state，它的用法类似 `[state setState] = useStore(key)` 中的 setState，但需要传入某个 store 的 key，强大地方是它可以在任何地方使用。

```js
// 直接 replace
mutate('User', { id: 1, name: 'foo' })

//or use function
mutate('User', state => ({
  ...state,
  name: 'foo',
}))

//or use immer
mutate('User', state => {
  state.name = 'foo'
})
```

mutate 你可以初始化一个**不存在的** store，这是一个特殊的使用场景。

举个例子，你可以用 mutate 初始化一个用户的 store:

```jsx
const user = localStorage.getItem('User') // { id: 1, name: 'foo' }
mutate('User', user)
```

然后在组件使用 (不需要再初始化):

```jsx
const Profile = () => {
  const [user, updateUser] = useStore('User')
  return (
    <div>
      <span>{user.name}</span>
      <button onClick={() => updateUser({ name: 'bar' })}>update user</button>
    </div>
  )
}
```

[![Edit broken-snow-7k6r8](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/broken-snow-7k6r8?fontsize=14&hidenavigation=1&theme=dark)
