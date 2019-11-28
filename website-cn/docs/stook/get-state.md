---
id: get-state
title: getState
sidebar_label: getState
---

在某些创景，你可能需要更灵活的读取 state，这时你可以使用 `getState`，比如下面两种场景：

- 在组件外读取 state
- 在组件内读取 state，却不订阅其更新

## 在组件外读取 state

为了业务逻辑能和组件渲染分离，我们把 `handleSubmit` 放在组件外：

```jsx
import React from 'react'
import { useStore, getState } from 'stook'

function submitUser() {
  const name = getState('[UserForm]')
  alert(name)
}

export const UserForm = () => {
  const [name, setName] = useStore('[UserForm]', 'initial name')
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={submitUser}>Submit</button>
    </div>
  )
}
```

[![Edit cool-framework-4mziz](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/cool-framework-4mziz?fontsize=14&hidenavigation=1&theme=dark)

对于大型项目，我们可能会为项目的架构分层，我们可能会有 service 层，这时 `getState` 就非常有用:

`user.service.ts`

```jsx
export function submitUser() {
  const name = getState('[UserForm]')
  alert(name)
}
```

`UserForm.ts`

```jsx
import React from 'react'
import { useStore } from 'stook'
import { getState } from './user.service.ts'

export const UserForm = () => {
  const [name, setName] = useStore('[UserForm]', 'initial name')
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={submitUser}>Submit</button>
    </div>
  )
}
```

## 在组件内读取 state

有时，由于某些特殊原因，我们可能会在组件内单纯地读取 state:

```jsx
export const User = () => {
  const name = getState('[UserName]')
  return (
    <div>
      <span>{name}</span>
    </div>
  )
}
```
