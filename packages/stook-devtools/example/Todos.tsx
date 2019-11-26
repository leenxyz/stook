import * as React from 'react'

import { useFetch } from 'stook-rest'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export const Todos = () => {
  const { loading, data, error } = useFetch<Todo[]>('http://jsonplaceholder.typicode.com/todos')

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
