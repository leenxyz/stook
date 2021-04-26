---
id: useUpdate
title: useUpdate
sidebar_label: useUpdate
---

`useFetch` 通常用于获取数据，`useUpdate` 通常用于创建/更新/删除数据。

## 基本用法

下面是一个添加一个 TodoItem 的例子，使用 `useUpdate` 你可以轻易的获取到网络请求的各种状态：

```jsx
export default () => {
  const [addTodo, { loading, called, data, error }] = useUpdate('/todos')

  return (
    <div className="App">
      <button
        onClick={() =>
          addTodo({
            body: { title: 'new TODO' },
          })
        }
      >
        {loading && 'loading...'}
        {!loading && (called ? 'Added' : 'Add Todo')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```

## 更新反馈

通常更新数据成功后，我们需要提示用户，使用`useUpdate` 可以有两种方式实现交互反馈：

**第一种，直接判断 data 和 error 的状态：**

```jsx
export default () => {
  const [addTodo, { loading, called, data, error }] = useUpdate('/todos')

  if (data) {
    alert('Add Todo successfully')
  }

  if (error) {
    alert('Add Todo fali')
  }

  return (
    <div className="App">
      <button
        onClick={() =>
          addTodo({
            body: { title: 'new TODO' },
          })
        }
      >
        {loading && 'loading...'}
        {!loading && (called ? 'Added' : 'Add Todo')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```

**第一种，在 update 函数中获取 data 和 error 的状态：**

```jsx
export default () => {
  const [update, { loading, called, data, error }] = useUpdate('/todos')

  const addTodo = async () => {
    const { data } = await update({
      body: { title: 'new TODO' },
    })
    if (data) {
      alert('Add Todo successfully')
    }
  }

  return (
    <div className="App">
      <button onClick={addTodo}>
        {loading && 'loading...'}
        {!loading && (called ? 'Added' : 'Add Todo')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```

## Options

`useUpdate` 的 options 和 `useFetch` 基本一样。