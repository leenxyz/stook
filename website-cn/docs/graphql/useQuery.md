---
id: useQuery
title: 获取数据 (useQuery)
sidebar_label: 获取数据 (useQuery)
---

> const result = useQuery(url, options, deps)

```jsx
import React from 'react'
import { useQuery } from 'stook-graphql'

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
  const { loading, data, error } = useQuery(GET_USER)

  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```