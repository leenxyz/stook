import * as React from 'react'
import TodoItem from './TodoItem'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import { useTodos } from '../hooks/todos.hooks'
import { useVisibilityFilter, Todo } from '../hooks/visibilityFilter.hooks'

function getVisibleTodos(todos: Todo[], visibilityFilter: string) {
  let visibleTodos: Todo[]
  switch (visibilityFilter) {
    case SHOW_ALL:
      visibleTodos = todos
      break
    case SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed)
      break
    case SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed)
      break
    default:
      visibleTodos = todos
  }
  return visibleTodos
}

const TodoList: React.SFC = () => {
  const { todos } = useTodos()
  const { visibilityFilter } = useVisibilityFilter()
  const visibleTodos = getVisibleTodos(todos, visibilityFilter)

  return (
    <ul className="todo-list">
      <React.Fragment>
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </React.Fragment>
    </ul>
  )
}

export default TodoList
