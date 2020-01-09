import { useStore } from 'stook'
import { TODOS } from '../constants'

export interface Todo {
  text: string
  completed: boolean
  id: number
}

export const useTodos = () => {
  const [todos, setTodos] = useStore<Todo[]>(TODOS, [
    {
      text: 'Use Stook',
      completed: false,
      id: 0,
    },
  ])

  const todosCount = todos.length
  const completedCount = todos.filter(todo => todo.completed).length

  const addTodo = (text: string) => {
    setTodos(todos => {
      todos.push({
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text,
      })
    })
  }

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const editTodo = ({ id, text }: Todo) => {
    const newTodos = todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    setTodos(newTodos)
  }

  const completeTodo = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
    setTodos(newTodos)
  }

  const completeAllTodos = () => {
    const areAllMarked = todos.every(todo => todo.completed)
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllMarked,
    }))
    setTodos(newTodos)
  }

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => todo.completed === false)
    setTodos(newTodos)
  }

  return {
    todos,
    todosCount,
    completedCount,
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    completeAllTodos,
    clearCompleted,
  }
}
