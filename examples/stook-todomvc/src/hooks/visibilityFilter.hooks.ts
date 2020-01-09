import { useStore } from 'stook'
import { VISIBILITY_FILTER } from '../constants'

export interface Todo {
  text: string
  completed: boolean
  id: number
}

export const useVisibilityFilter = () => {
  const [visibilityFilter, setVisibilityFilter] = useStore<string>(VISIBILITY_FILTER, 'show_all')

  return { visibilityFilter, setVisibilityFilter }
}
