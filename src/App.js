import React, { useState } from 'react';

import Demo from './templates/Demo';
import AmChartSample from './templates/AmChartSample';
import PairSelect from './templates/PairSelect';
import SampleList from './templates/SampleList';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


function App() {
  const [pairs, setPairs] = useState([
    { name: 'USD_JPY', uniqueId: -2 },
    { name: 'EUR_USD', uniqueId: -1 }
  ]);
  const [uniqueId, setUniqueId] = useState(0);

  function addPair(name) {
    pairs.push({ name: name, uniqueId: uniqueId });
    setPairs(pairs);
    setUniqueId(uniqueId + 1);
  }

  function resetPairs() {
    setPairs([]);
    setUniqueId(0);
  }

  return (
    <>
      <Container> {/*maxWidth="sm"*/}
        <PairSelect addPair={addPair} />
        <SampleList pairs={pairs}/>
        <Button onClick={resetPairs} >Clear</Button>
      </Container>
      <AmChartSample />

      <Demo />
    </>
  );
}

export default App;
