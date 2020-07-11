import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import tasksReducer from './reducers/tasks';
import TasksApp from './containers/TasksApp';

const logger = createLogger({collapsed: true})
const store = createStore(tasksReducer, applyMiddleware(logger));

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
