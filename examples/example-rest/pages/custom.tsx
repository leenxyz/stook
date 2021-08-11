import { config, useFetch } from 'stook-rest'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

interface Todo {
  id: number
  title: string
  completed: boolean
}

const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch<Todo[]>('/todos')
  const count = todos.length
  const completedCount = todos.filter((i) => i.completed).length
  return { loading, todos, count, completedCount, error }
}

const TodoList = () => {
  const { loading, todos, count, completedCount } = useFetchTodos()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>TodoList:</div>
      <div>todos count: {count}</div>
      <div>completed count: {completedCount}</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoList = () => {
  const { loading, todos, count, completedCount } = useFetchTodos()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoList:</div>
      <div>todos count: {count}</div>
      <div>completed count: {completedCount}</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

export default function Page() {
  return (
    <div style={{ display: 'flex' }}>
      <TodoList></TodoList>
      <ReuseTodoList></ReuseTodoList>
    </div>
  )
}
