import { useFetch } from 'stook-rest'
interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useFetchTodos = () => {
  const result = useFetch<Todo[]>('/todos')
  const { data: todos = [] } = result
  const count = todos.length
  const completedCount = todos.filter(i => i.completed).length

  return {
    ...result,
    todos,
    count,
    completedCount,
  }
}
