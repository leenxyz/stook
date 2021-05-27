import { useLocalStorage } from 'stook-localstorage';

export default function IndexPage() {
  const [value, setItem] = useLocalStorage('STORAGE_KEY', true);
  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setItem(false)}>update</button>
    </div>
  );
}
