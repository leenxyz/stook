import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStore, mutate } from '../.';

const Counter = () => {
  const [count, setCount] = useStore('COUNTER', 2);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

const App = () => {
  const [count] = useStore('COUNTER', 0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => mutate('COUNTER', count + 2)}>mutate</button>
      <Counter></Counter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
