import PropTypes from 'prop-types';
import React from 'react';

export default class SampleRequesting extends React.Component {
  // INFO: Why is it unsafe ?
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillMount() {
    this.props.onMount(this.props.pareName);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.pareName !== nextProps.pareName) {
      this.props.onUpdate(nextProps.pareName);
    }
  }

  render() {
    return (
      <>
        <h2>SampleRequesting Component</h2>
        <p>{this.props.pareName}</p>
        {/* <ul>
          {
            this.state.tasks.map(function(item, i) {
              return (<li key={i}>{item}</li>);
            })
          }
        </ul> */}
      </>
    )
  }
}

SampleRequesting.propTypes = {
  pareName: PropTypes.string.isRequired,
};
