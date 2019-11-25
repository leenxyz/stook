import { useStore } from '../src'

export function useCounter() {
  const [count, setCount] = useStore('[Counter]', 10)
  const decrease = () => setCount(count - 1)
  const increase = () => setCount(count + 1)
  return { count, increase, decrease }
}
