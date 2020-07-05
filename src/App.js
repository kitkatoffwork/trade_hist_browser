import React, { Component } from 'react';

import Demo from './Demo';
import PairSelect from './PairSelect';
import History from './History';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pairs: [
        { name: 'USD_JPY', uniqueId: -2 },
        { name: 'EUR_USD', uniqueId: -1 }
      ],
      uniqueId: 0
    };
  }

  addPair = (name) => {
    const { pairs, uniqueId } = this.state;

    pairs.push({
      name: name, uniqueId: uniqueId
    });

    this.setState({
      pairs, uniqueId: uniqueId + 1
    });
  }
  resetPairs = () => {
    this.setState({
      pairs: [], uniqueId: 0
    });
  }

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography>サンプルページ</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Container> {/*maxWidth="sm"*/}
          <PairSelect addPair={this.addPair} />
          <History pairs={this.state.pairs}/>
          {/* <Form name = 'なまえ' /> */}
          <Button onClick={this.resetPairs} >Clear</Button>
        </Container>
        <Demo />
      </>
    );
  }
}

export default App;
