import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStore } from '../.';

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
      <Counter></Counter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
