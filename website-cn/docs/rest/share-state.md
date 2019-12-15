---
id: share-state
title: Share state
sidebar_label: Share state
---

## 使用

stook-rest 另一个强大的特性是请求数据的共享，由于 stook-rest 底层的数据管理是基于 stook 的，所以跨组件共享数据将变得非常简单：

```jsx
const TodoItem = () => {
  const { loading, data: todo } = useFetch('/todos/1')
  if (loading) return <div>loading....</div>
  return (们
    <div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoItem = () => {
  const { loading, data: todo } = useFetch('/todos/1')
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <div>
    <TodoItem></TodoItem>
    <ReuseTodoItem></ReuseTodoItem>
  </div>
)
```

上面我们在两个组件中使用了 `useFetch`，它们的唯一 key 是一样的 (都是 `GET /todos/1`)，而且只会发送一次请求，两个组件会使用同一份数据。

## 优化

个人不太建议直接在多个组件使用同一个 `useFetch`，更进一步使用自定义 hooks，增强业务逻辑的复用性：

```jsx
const useFetchTodo = () => {
  const { loading, data: todo, error } = useFetch('/todos/1')
  return { loading, todo, error }
}

const TodoItem = () => {
  const { loading, todo } = useFetchTodo()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>TodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoItem = () => {
  const { loading, todo } = useFetchTodo()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <div>
    <TodoItem></TodoItem>
    <ReuseTodoItem></ReuseTodoItem>
  </div>
)
```
