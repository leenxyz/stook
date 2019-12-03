# Stook

[![npm](https://img.shields.io/npm/v/stook.svg)](https://www.npmjs.com/package/stook) [![Coverage Status](https://coveralls.io/repos/github/forsigner/stook/badge.svg?branch=master)](https://coveralls.io/github/forsigner/stook?branch=master) [![Minzipped size](https://img.shields.io/bundlephobia/minzip/stook.svg)](https://bundlephobia.com/result?p=stook) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Manage {store} in {hooks}.

## Documentation

The documentation site of stook is hosted at [The documentation site of stook is hosted at [https://stook.now.sh](https://stook.now.sh/).

## Quick start

**simplest**

```tsx
import React from 'react'
import { useStore } from 'stook'

function Counter() {
  const [count, setCount] = useStore('Counter', 0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

**share state**

```jsx
import React from 'react'
import { useStore } from 'stook'

function Counter() {
  const [count, setCount] = useStore('Counter', 0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

function Display() {
  const [count] = useStore('Counter')
  return <p>{count}</p>
}

function App() {
  return (
    <div>
      <Counter />
      <Display />
    </div>
  )
}
```

## License

[MIT License](https://github.com/forsigner/stook/blob/master/LICENSE)
