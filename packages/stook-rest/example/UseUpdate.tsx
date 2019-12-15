import React from 'react'

import { config, useUpdate } from '../src'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export default () => {
  const [addTodo, { loading, called, data, error }] = useUpdate('/todos')

  return (
    <div className="App">
      <button
        onClick={() =>
          addTodo({
            body: { title: 'new TODO' },
          })
        }
      >
        {loading && 'loading...'}
        {!loading && (called ? 'Added' : 'Add Todo')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
