import React, { Component } from 'react';

function SamplePairName(props) {
  return (
    <tr key={props.name}>
      <td>{`${props.name} ${props.uniqueId}`}</td>
    </tr>
  );
}

export default class SampleList extends Component {
  render() {
    const list = this.props.pairs.map(pair => {
      return <SamplePairName {...pair} key={pair.uniqueId} />
    });

    return (
      <table>
        <thead>
          <tr><th>Name</th></tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    )
  };
}
