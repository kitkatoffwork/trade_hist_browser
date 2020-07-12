import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import * as reducers from './reducers';
import TasksApp from './containers/TasksApp';

const middlewares = [createLogger({collapsed: true}), thunk];
const store = createStore(
  combineReducers(reducers), applyMiddleware(...middlewares)
);

// INFO: axios と react の連携について
// http://i-plug-tech.hatenablog.com/entry/2016/10/20/110000

function renderApp(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={App} />
        <Route exact path="/task" component={TasksApp} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store))
renderApp(store);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
