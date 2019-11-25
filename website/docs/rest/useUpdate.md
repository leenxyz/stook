---
id: useUpdate
title: 更新数据 (useUpdate)
sidebar_label: 更新数据 (useUpdate)
---

```jsx
import React from 'react'
import { useUpdate } from 'stook-rest'

export default () => {
  const [addTodo, { loading, data, error }] = useUpdate('/todos')

  return (
    <div className="App">
      <button onClick={() => addTodo({ title: 'new TODO' })}>
        {loading === undefined && 'Add Todo'}
        {loading !== undefined && (loading ? 'loading...' : ' Added')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

```