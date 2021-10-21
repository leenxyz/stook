import { config, useFetch, applyMiddleware } from 'stook-rest'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

applyMiddleware(async (ctx, next) => {
  await next()
  ctx.valid = false
  console.log('ctx', ctx)
})

const TodoItem = () => {
  const {
    loading,
    called,
    data: todo,
    start,
    error,
  } = useFetch('/todos/1', {
    // lazy: true,
  })

  console.log('loading:', loading, 'called:', called, 'error:', error)

  if (loading)
    return (
      <div>
        <button onClick={() => start({ query: { foo: 'bar' } })}>start</button>
        {loading && called && <div>loading....</div>}
      </div>
    )

  return (
    <div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoItem = () => {
  const { loading, data: todo } = useFetch('/todos/1')
  if (loading) return <div>loading....</div>

  return (
    <div>
      <div>ReuseTodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <TodoItem></TodoItem>
      {/* <ReuseTodoItem></ReuseTodoItem> */}
    </div>
  )
}
