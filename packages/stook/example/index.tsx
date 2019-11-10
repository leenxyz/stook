import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStore, mutate } from './src';

const Counter = () => {
  const [count, setCount] = useStore('COUNTER', { num: 0 });
  return (
    <div>
      <button
        onClick={() =>
          setCount(count => {
            // return { num: count.num - 1 };
            count.num--;
          })
        }
      >
        -
      </button>
      <span>{count.num}</span>
      <button onClick={() => setCount({ num: count.num + 1 })}>+</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter></Counter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
