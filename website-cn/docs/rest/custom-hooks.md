---
id: custom-hooks
title: Custom hooks
sidebar_label: Custom hooks
---

在真实的业务开发中，不建议直接在组件中使用 `useFetch`，更推荐是使用使用自定义 hooks 对请求的业务逻辑进行封装。

## 如何自定义 hooks ?

```jsx
const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch('/todos')
  return { loading, todos, error }
}
```

## 为何推荐自定义 hooks ?

自定义 hooks 有下面几点好处：

### 为 hooks 命名

这看上去和直接使用 `useFetch` 没有太大区别，实际上它增加了代码的可读性。

### 文件更易管理

如果我们我们直接在组件中使用 `useFetch`，我们需要在组件引入非常多文件。这个请求数据只有一个组件使用还好，如果多个组件需要共享此请求数据，文件管理将会非常乱。

```tsx
import React from 'react'
import { useFetch } from 'stook-rest'
import { Todo } from '../../typings'
import { GET_TODO } from '../../URL.constant'

export default () => {
  const { data: todos } = useFetch<Todo[]>(GET_TODO)

  if (loading) return <div>loading....</div>
  return (
    <div className="App">
      <div>Todo:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}
```

如果使用使用自定义 hooks，我们只需在组件中引入 hooks:

```tsx
import React from 'react'
import { useFetchTodos } from '../../useFetchTodos'

export default () => {
  const { loading, todos } = useFetchTodos()

  if (loading) return <div>loading....</div>
  return (
    <div className="App">
      <div>Todos:</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}
```

### 更好管理 computed value:

为了业务逻辑更好的复用，我们经常会使用 computed value:

```tsx
const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch<Todo[]>('/todos')
  const count = todos.length
  const completedCount = todos.filter(i => i.completed).length
  return { loading, todos, count, completedCount, error }
}
```

### 更优雅地共享数据

自定义 hooks 让数据跨组件共享数据更加优雅：

```tsx
interface Todo {
  id: number
  title: string
  completed: boolean
}

const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch<Todo[]>('/todos')
  const count = todos.length
  const completedCount = todos.filter(i => i.completed).length
  return { loading, todos, count, completedCount, error }
}

const TodoList = () => {
  const { loading, todos, count, completedCount } = useFetchTodos()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>TodoList:</div>
      <div>todos count: {count}</div>
      <div>completed count: {completedCount}</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoList = () => {
  const { loading, todos, count, completedCount } = useFetchTodos()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoList:</div>
      <div>todos count: {count}</div>
      <div>completed count: {completedCount}</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <div style={{ display: 'flex' }}>
    <TodoList></TodoList>
    <ReuseTodoList></ReuseTodoList>
  </div>
)
```
