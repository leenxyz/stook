---
id: test
title: Test
sidebar_label: Test
---


测试 stook 是一件非常简单的事，因为测试 stook 也就是在测试 react hooks。

推荐使用 [react-hooks-testing-library](https://react-hooks-testing-library.com/)工具来测试 stook。

## 安装依赖

```bash
npm install -D @testing-library/react-hooks react-test-renderer
```

## 例子

**`useCounter.ts`**

```js
function useCounter() {
  const [count, setCount] = useStore('[Counter]', 0)
  const decrease = () => setCount(count - 1)
  const increase = () => setCount(count + 1)
  return { count, increase, decrease }
}
```

**`useCounter.test.ts`**

```js
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increase()
  })

  expect(result.current.count).toBe(1)
})
```

更多的测试技巧请看：[react-hooks-testing-library](https://react-hooks-testing-library.com/)。
