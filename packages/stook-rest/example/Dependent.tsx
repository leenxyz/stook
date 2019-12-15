import React from 'react'

import { config, useFetch } from '../src'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export default () => {
  const { data: todos } = useFetch('/todos')

  const { loading, data: todo } = useFetch('/todos/:id', {
    params: () => ({ id: todos[9].id }),
  })

  if (loading) return <div>loading....</div>

  return (
    <div className="App">
      <div>Todo:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}
