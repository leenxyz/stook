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

### 第一步: 定义 Entity

```ts
@Entity('user-entity')
export class User {
  @Field({ defaultValue: 'jobs' })
  username: string

  @Field({ defaultValue: '' })
  password: string

  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }
}
```

### 第二步: 绑定 Entity 到 Form

```tsx
import React from 'react'
import { useForm } from 'stook-form'

export default () => {
  return <EntityForm entity={User}></EntityForm>
}
```
