---
id: useMutation
title: useMutation
sidebar_label: useMutation
---

```jsx
import React from 'react'
import { useMutation } from 'stook-graphql'

const GET_USER = `
  query User {
    userById(_id: "57bb44dd21d2befb7ca3f010") {
      name
      gender
      age
    }
  }
`

export default () => {
  const [addTodo, { loading, data, error }] = useMutation(GET_USER)
  return (
    <div>
      <button onClick={() => addTodo({})}>
        {loading === undefined && 'Add Todo'}
        {loading !== undefined && (loading ? 'loading...' : ' Added')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```
