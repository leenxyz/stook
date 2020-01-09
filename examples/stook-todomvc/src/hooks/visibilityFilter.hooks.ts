import { useStore } from 'stook'

type VisibilityFilter = 'show_all' | 'show_completed' | 'show_active'

export interface Todo {
  text: string
  completed: boolean
  id: number
}

export const useVisibilityFilter = () => {
  const [visibilityFilter, setVisibilityFilter] = useStore<string>('visibilityFilter', 'show_all')

  return { visibilityFilter, setVisibilityFilter }
}
