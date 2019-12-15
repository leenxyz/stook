import React from 'react'

import { config, useUpdate } from '../src'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default () => {
  const [update, { loading, called, data, error }] = useUpdate<Todo[]>('/todos')
  if (data) {
    alert('Add Todo successfully') 
  }

  const addTodo = async () => {
    const { data } = await update({
      body: { title: 'new TODO' },
    })
    if (data) {
      // alert('Add Todo successfully')
    }
  }

  return (
    <div className="App">
      <button onClick={addTodo}>
        {loading && 'loading...'}
        {!loading && (called ? 'Added' : 'Add Todo')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
