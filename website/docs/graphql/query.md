---
id: query
title: query
sidebar_label: query
---

```jsx
import React, { useState, useEffect } from 'react'
import { query } from 'stook-graphql'

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
  const [data, setData] = useState()

  useEffect(() => {
    async function queryData() {
      const res = await query(GET_USER)
      setData(res)
    }
    queryData()
  }, [])

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

```