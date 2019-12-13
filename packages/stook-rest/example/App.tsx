import React, { useState, useEffect, memo } from 'react'

import { config, fetch, useFetch, useUpdate, fetcher, RestOptions, applyMiddleware } from '../src'

applyMiddleware(async (ctx, next) => {
  ctx.headers.fo = 'livia'
  await next()
  // console.log('4')
  // ctx.body = { ddd: ctx.body }
  // console.log('context.body:', ctx.body)
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
  QueryTodo = 'GET /todos',
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
      setData(res)
    } catch (error) {
      setData(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <pre className="App">{JSON.stringify(data, null, 2)}</pre>
}

const Dependent = () => {
  const { loading: loading, data: todos, refetch } = useFetch<Todo[]>(Api.QueryTodo, {
    key: 'haha',
  })
  // const { data: todo } = useFetch<Todo>(Api.GetTodo, {
  //   // params: { id: 10 },
  //   params: () => {
  //     return { id: todos[1].id }
  //     // return { id: 9 }
  //   },
  // })

  const { data: todo } = useFetch<Todo>(Api.QueryTodo, {
    // query: { _limit: 2 },
    key: 'test',
    query: () => {
      // console.log('todos[4].id:', todos[2].id)
      return { _limit: todos[2].id }
      // return { _limit: 2 }
    },
  })

  // const { data: todox } = useFetch<Todo>(Api.CreateTodo, {
  //   body() {
  //     return { title: todos[10].title }
  //   },
  // })

  return (
    <div className="App">
      <h2
        onClick={() => {
          console.log('111')
          refetch()
        }}
      >
        Dependent
      </h2>
      <div>Todo:</div>
      {todo && <pre>{JSON.stringify(todo, null, 2)}</pre>}
      <div>Todos:</div>
      {todos && <pre>{JSON.stringify(todos[0], null, 2)}</pre>}
    </div>
  )
}

const UseFetchApp = () => {
  const { loading, data, error, refetch } = useFetch<Todo>(Api.GetTodo, { params: { id: 1 } })

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
    {/* <FetchApp /> */}
    <Dependent></Dependent>
    {/* <UseFetchApp /> */}
    {/* <UseUpdateApp /> */}
  </div>
)
