import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default class Header extends Component {
  render() {
    return(
      <AppBar position="static">
        <Toolbar>
          <Typography>
            <Link to="/">サンプルページ</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/task">TODO MEMO</Link>
          </Button>
          <Button color="inherit">
            <Link to="/tradesHist">Trades Hist</Link>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
