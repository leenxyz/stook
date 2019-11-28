---
id: nested-object
title: 嵌套对象
sidebar_label: 嵌套对象
---

`stook-form` 默认支持嵌套对象，使用 Lodash-like 用法设置 name:

```js
import React from 'react'
import { useForm } from 'stook-form'

class Profile {
  name: string
  intro: string
}

class User {
  profile: Profile = {
    name: 'James',
    intro: 'hey guys',
  }
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('profile.name')} />
      <input {...name('profile.intro')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```
