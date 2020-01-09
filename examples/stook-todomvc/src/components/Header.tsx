import * as React from 'react'
import TodoTextInput from './TodoTextInput'
import { useTodos } from '../hooks/todos.hooks'

const Header = () => {
  const { addTodo } = useTodos()
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo={true}
        onSave={text => {
          if (text.length !== 0) {
            addTodo(text)
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

export default Header
