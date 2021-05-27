import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useToggle } from './src';

const App = () => {
  const [value1, toggle1] = useToggle('key1');
  const [value2, toggle2] = useToggle('key2', true);
  const [value3, toggle3] = useToggle('key3', ['none', 'block']);
  const [value4, toggle4] = useToggle('key4', [
    { name: 'foo' },
    { name: 'bar' },
  ]);
  return (
    <>
      <section>
        <h3>Default inital</h3>
        <button onClick={toggle1}>{value1.toString()}</button>
      </section>
      <section>
        <h3>boolean initial</h3>
        <button onClick={toggle2}>{value2.toString()}</button>
      </section>
      <section>
        <h3>string initial</h3>
        <button onClick={toggle3}>{value3}</button>
      </section>

      <section>
        <h3>object initial</h3>
        <button onClick={toggle4}>{JSON.stringify(value4, null, 2)}</button>
      </section>
    </>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
