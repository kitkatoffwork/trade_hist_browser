import React, { Component } from 'react';
// import { Form } from './Form';

import Demo from './Demo';
import PairSelect from './PairSelect';
import History from './History';

// Design
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
    super(props) // 親クラスのpropsを参照するために必要
    this.state = {
      pairs: [
        { name: 'USD_JPY' },
        { name: 'EUR_USD' }
      ]
    };
  }

  // componentDidMount() {
  //   console.log('hoge');
  // }

  addPair = (name) => {
    const { pairs } = this.state;

    pairs.push({
      name
    });

    this.setState({
      pairs
    });
  }
  resetPairs = () => {
    this.setState({
      pairs: [],
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
