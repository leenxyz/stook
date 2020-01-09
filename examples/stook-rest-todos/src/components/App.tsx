import React from 'react'
import { useFetchTodos } from '../hooks/useFetchTodos.hooks'

export default () => {
  const { loading, todos, count, completedCount } = useFetchTodos()

  if (loading) return <div>loading....</div>
  return (
    <div className="App">
      <h2>Todos:</h2>
      <div>
        <span>总计：{count}</span>
        <span>&nbsp;&nbsp;</span>
        <span>已完成：{completedCount}</span>
      </div>
      <ul>
        {todos.map(item => (
          <li key={item.id} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
