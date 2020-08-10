import React, { Component } from 'react';

import Demo from './Demo';
import SampleChart from './SampleChart';
import PairSelect from './PairSelect';
import History from './History';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

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
        <Container> {/*maxWidth="sm"*/}
          <PairSelect addPair={this.addPair} />
          <History pairs={this.state.pairs}/>
          {/* <Form name = 'なまえ' /> */}
          <Button onClick={this.resetPairs} >Clear</Button>
        </Container>
        <SampleChart />
        <span>test hoge huga !</span>

        <Demo />
      </>
    );
  }
}

export default App;
