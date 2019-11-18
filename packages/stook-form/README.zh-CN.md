# stook-form

> React Form base on hooks

[English](./README.md) | 简体中文

## 安装

```sh
npm i stook-form
```

## 快速开始

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

## License

[MIT License](https://github.com/forsigner/stook/blob/master/LICENSE)
