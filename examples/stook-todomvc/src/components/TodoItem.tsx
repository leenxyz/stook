import * as React from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import { useTodos } from '../hooks/todos.hooks'

interface Props {
  todo: object | any // TODO
}

const TodoItem: React.SFC<Props> = props => {
  const USE_STATE = 'useState'
  const useState = React[USE_STATE]
  const [editing, setState] = useState(false)
  const { todo } = props
  const { deleteTodo, editTodo, completeTodo } = useTodos()

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      deleteTodo(id)
    } else {
      editTodo({ id, text } as any)
    }
    setState(false)
  }

  const handleDoubleClick = () => {
    setState(true)
  }

  let element

  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={text => handleSave(todo.id, text)}
      />
    )
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button
          className="destroy"
          onClick={() => {
            deleteTodo(todo.id)
          }}
        />
      </div>
    )
  }
  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing,
      })}
    >
      {element}
    </li>
  )
}

export default TodoItem
