import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import tasksReducer from './tasks'
import requestReducer from './SampleRequesting'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  tasksReducer,
  requestReducer,
})
export default createRootReducer
