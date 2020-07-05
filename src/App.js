import React, { Component } from 'react';

// Design
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography>サンプルページ</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <DemoTitle />
      </>
    );
  }
}

function DemoTitle() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
