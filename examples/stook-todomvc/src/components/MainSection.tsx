import * as React from 'react'
import Footer from './Footer'
import TodoList from './TodoList'
import { useTodos } from '../hooks/todos.hooks'

const MainSection = () => {
  const { todosCount, completedCount, completeAllTodos, clearCompleted } = useTodos()

  return (
    <section className="main">
      <React.Fragment>
        {!!todosCount && (
          <span>
            <input className="toggle-all" type="checkbox" />
            <label onClick={completeAllTodos} />
          </span>
        )}
        <TodoList />
        {!!todosCount && (
          <Footer
            completedCount={completedCount}
            activeCount={todosCount - completedCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </React.Fragment>
    </section>
  )
}

export default MainSection
