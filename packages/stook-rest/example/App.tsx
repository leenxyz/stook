import React, { useState, useEffect } from 'react'

import { config, fetch, useFetch, useUpdate, fetcher, RestOptions, applyMiddleware } from './src'

applyMiddleware(async (ctx, next) => {
  ctx.headers.fo = 'livia'
  await next()
  // console.log('4')
  // ctx.body = { ddd: ctx.body }
  // console.log('context.body:', ctx.body)
})

applyMiddleware(async (ctx, next) => {
  console.log('2')
  console.log('context.headers:', ctx.headers)
  ctx.headers.uuid = '123455'
  await next()
  console.log('3')
})

const options: RestOptions = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    foo: 'bar',
  },
}

config(options)

// const client = new Client({ baseURL: 'https://jsonplaceholder.typicode.com' })

enum Api {
  GetTodo = 'GET /todos/:id',
  CreateTodo = 'POST /todos',
}

interface Todo {
  id: number
  title: string
  completed: boolean
}

const FetchApp = () => {
  const [data, setData] = useState()
  async function fetchData() {
    try {
      const res = await fetch<Todo>('/todos/1')
      console.log('res---------------:', res)
      setData(res)
    } catch (error) {
      console.log('==========error---------------:', error)
      setData(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <pre className="App">{JSON.stringify(data, null, 2)}</pre>
}

const UseFetchApp = () => {
  const { loading, data, error, refetch } = useFetch<Todo>(Api.GetTodo, {
    params: { id: 1 },
    headers: { hello: 'hahaa' },
    // deps: [store.id],
  })

  console.log('data:', data)

  const handleClick = async () => {
    const r = await refetch<Todo>({ params: { id: 2 } })
    console.log('r:', r)
  }

  if (loading) return <div>loading....</div>
  if (error)
    return (
      <div>
        error: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )

  return (
    <div className="App">
      <h2>useFetch</h2>
      <button onClick={handleClick}>refetch</button>
      <button onClick={() => fetcher.get(Api.GetTodo).refetch({ params: { id: 3 } })}>
        refetch with fetcher
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const UseUpdateApp = () => {
  const [addTodo, { loading, data, error }] = useUpdate(Api.CreateTodo)

  return (
    <div className="App">
      <button onClick={() => addTodo({ body: { title: 'New TODO' } })}>
        {loading === undefined && 'Add Todo'}
        {loading !== undefined && (loading ? 'loading...' : ' Added')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default () => (
  <div>
    <FetchApp />
    <UseFetchApp />
    <UseUpdateApp />
  </div>
)
