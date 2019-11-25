---
id: mutate
title: mutate
sidebar_label: mutate
---

`mutate` 用来改变一个 store 的 state，它的用法类似 `[state setState] = useStore(key)` 中的 setState，但需要传入某个 store 的 key，强大地方是它可以在任何地方使用。

```js
mutate('USER', { id: 1, name: 'foo' })

//or

mutate('USER', state => ({
  ...state,
  name: 'foo',
}))

//or

mutate('USER', state => {
  state.name = 'foo'
})
```

mutate 你可以初始化一个不存在的 store，这是一个特殊的使用场景。

举个例子，你可以用 mutate 初始化一个用户的 store:

```jsx
const user = localStorage.getItem('USER') // { id: 1, name: 'foo' }
mutate('USER', user)
```

然后在组件使用 (不需要再初始化):

```jsx
const Profile = () => {
  const [user, updateUser] = useStore('USER')
  return (
    <div>
      <span>{user.name}</span>
      <button onClick={() => updateUser({ name: 'bar' })}>update user</button>
    </div>
  )
}
```
