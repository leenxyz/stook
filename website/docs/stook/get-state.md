---
id: get-state
title: getState
sidebar_label: getState
---

在某些创景，你可能需要更灵活的读取 state，比如在组件外读取 state，或者在组件内却不订阅 state 的更新，这时你可以使用 `getState`:

```jsx
const user = getState('USER')
```
