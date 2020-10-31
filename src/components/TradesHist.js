import PropTypes from 'prop-types';
import React from 'react';
import CandleChart from './candle_chart';

export default class TradesHist extends React.Component {
  // INFO: 画面初期描画と同時にグラフも描画する場合はこれをコメントイン
  componentDidMount() {
    this.props.onMount(this.props.pareName);
  }
  /* この componentDidUpdate をコメントアウトしても、少なくとも初回は request が飛んでいる */
  componentDidUpdate(nextProps) {
    if (this.props.pareName !== nextProps.pareName) {
      this.props.onUpdate(nextProps.pareName);
    }
  }

  render() {
    const { pareName, data, error } = this.props;
    return (
      <>
        <h2>TradesHist Component</h2>
        <p>Pare Name: {pareName}</p>

        {(() => {
          if (error) {
            return <p>エラーが発生しました。リロードして下さい。</p>
          } else if (data === 'undefined') {
            return <p>Now Loading ...</p>
          } else {
            return(
              <>
                <CandleChart candles={data.slice(-400)} />
                <table>
                  <thead>
                    <tr>
                      <th>time</th>
                      <th>open</th>
                      <th>high</th>
                      <th>low</th>
                      <th>close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map( (datum, i) => (
                      <tr key={i}>
                        <td>{datum.time}</td>
                        <td>{datum.open}</td>
                        <td>{datum.high}</td>
                        <td>{datum.low}</td>
                        <td>{datum.close}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            );
          }
        })()}

      </>
    )
  }
}

TradesHist.propTypes = {
  // onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  pareName: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        hoge: PropTypes.number,
        huga: PropTypes.number,
      })
    )
  ]),
  error: PropTypes.bool.isRequired
};
