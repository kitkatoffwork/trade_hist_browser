import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import tasksReducer from './tasks'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  tasksReducer,
})
export default createRootReducer
