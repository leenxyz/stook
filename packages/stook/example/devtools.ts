import { createStore, combineReducers } from 'redux'
import { getState, onStoreInit, onStoreUpdate } from './src'

export class devtools {
  static init() {
    // init REDUX_DEVTOOLS_EXTENSION
    const INITIAL_STOOK_REDUCER = (state = 0) => state
    const store = createStore(
      combineReducers({ INITIAL_STOOK_REDUCER }),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    )

    const reducers = {} as any
    function createReducers(key: any) {
      const initialState = getState(key)
      reducers[key] = (state: any = initialState, action: any) => {
        if (action.type !== key) return state
        return action.nextState
      }
      return reducers
    }

    onStoreInit(key => {
      const reducers = createReducers(key)
      console.log('reducers:', reducers)
      store.replaceReducer(combineReducers(reducers))
    })

    onStoreUpdate(({ key, nextState }) => {
      store.dispatch({ type: key, nextState })
    })
  }
}
