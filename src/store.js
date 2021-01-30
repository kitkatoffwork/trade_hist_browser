import { routerMiddleware } from 'connected-react-router';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger';

import createRootReducer from './reducers'

export const history = createBrowserHistory()

const middlewares = [
  ...getDefaultMiddleware(),
  routerMiddleware(history), // for dispatching history actions
  createLogger({collapsed: true}),
];

export default function loadStore() {
  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
  })
  return store
}
