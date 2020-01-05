import React from 'react'
import { config, useFetch } from '../src'

config({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export default () => {

  const [count, setCount] = React.useState(1);
  const { loading, data, error } = useFetch("/todos", {
    deps: [count]
  });

  if (loading) return <span>loading...</span>;
  if (error) return <span>error!</span>;

  const update = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={update}>Update Page</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
