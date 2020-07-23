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
    const { pareName, data, error } = this.props;
    return (
      <>
        <h2>SampleRequesting Component</h2>
        <p>Pare Name: {pareName}</p>

        {(() => {
          if (error) {
            return <p>エラーが発生しました。リロードして下さい。</p>
          } else if (data === 'undefined') {
            return <p>Now Loading ...</p>
          } else {
            return(
              <ul>
                {data.hoge.map( (datum, i) => (
                  <li key={i}>{Object.keys(datum)[0]}</li>
                ))}
              </ul>
            );
          }
        })()}

      </>
    )
  }
}

SampleRequesting.propTypes = {
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  pareName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    hoge: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.number)
    )
  }),
  error: PropTypes.bool.isRequired
};
