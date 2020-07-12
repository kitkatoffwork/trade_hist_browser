import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import createRootReducer from './reducers'

export const history = createBrowserHistory()
export default function loadStore() {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      createLogger({collapsed: true}),
      thunk
    ),),
  )
  return store
}
