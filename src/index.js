import { ConnectedRouter } from 'connected-react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from "react-router-dom";

import './index.css';

import App from './App';
import Header from './Header';
import TasksApp from './containers/TasksApp';
import SampleRequesting from './containers/SampleRequesting';
import * as serviceWorker from './serviceWorker';
import loadStore, { history }  from './store'
const store = loadStore()

// INFO: axios と react の連携について
// http://i-plug-tech.hatenablog.com/entry/2016/10/20/110000

function renderApp(store) {
  // console.log(SampleRequesting);
  // console.log(TasksApp);

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />

        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/task" component={TasksApp} />
          <Route
            exact path="/request"
            render={() => <SampleRequesting pareName="USD_JPY" />}
          />
        </Switch>
      </ConnectedRouter>
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
