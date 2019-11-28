---
id: array
title: 数组
sidebar_label: 数组
---

`stook-form` 默认支持数组，使用 Lodash-like 用法设置 name:

```js
import React from 'react'
import { useForm } from 'stook-form'

class User {
  friends = ['Rose', 'Curry']
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('friends[0]')} />
      <input {...name('friends[1]')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```
