---
id: quick-start
title: 快速上手
sidebar_label: 快速上手
---

## 安装

```bash
npm i stook-form
```

## 使用

下面代码展示 `stook-form` 的基本用法：

```js
import React from 'react'
import { useForm } from 'stook-form'

class User {
  username = 'foo'
  password = ''
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      console.log('values:', values)
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('username')} />
      <input {...name('password')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```
