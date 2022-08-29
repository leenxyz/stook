# stook-localstorage

## Installation

```bash
npm i stook-localstorage
```

## Usage

**string value**

```jsx
const App = () => {
  const [value, setItem] = useLocalStorage('STORAGE_KEY', 'initialValue');
  return (
    <div>
      <span>value</span>
      <button onClick={() => setItem('newValue')}>update</button>
    </div>
  );
};
```

**number value**

```jsx
const App = () => {
  const [value, setItem] = useLocalStorage('STORAGE_KEY', 100);
  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setItem(10)}>update</button>
    </div>
  );
};
```

**boolen value**

```jsx
const App = () => {
  const [value, setItem] = useLocalStorage('STORAGE_KEY', true);
  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setItem(false)}>update</button>
    </div>
  );
};
```

**object value**

```jsx
const App = () => {
  const [user, setUser] = useLocalStorage('USER', { name: 'foo' });
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => setUser({ name: 'bar' })}>set name</button>
    </div>
  );
};
```

## getLocalStorage

getLocalStorage will return Object, not string

```jsx
const data = getLocalStorage('USER');
```

## License

[MIT License](https://github.com/forsigner/stook-localstorage/blob/master/LICENSE)
