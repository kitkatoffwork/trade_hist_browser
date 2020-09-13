import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'

import * as apexHelper from '../models/apexHelper'

class CandleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'scatter',
          height: 350
        },
        // marker: {
        //   showNullDataPoints: false
        // },
        title: {
          text: 'CandleStick Chart---',
          align: 'left'
        },
        tooltip: {
          // enabled: true,
          // intersect: true,
          // followCursor: true,

          // x: { show: false }
        },
        xaxis: {
          tooltip: {
            enabled: true,
          },
          crossHairs: {
            show: true,
            position: 'back'
          },
          labels: {
            formatter: function(val) {
              return val;
              // return dayjs(val).format('YY-MM-DD HH:mm')
            }
          },
          type: 'category'
        },
        yaxis: {
          forceNiceScale: true,
          tooltip: {
            enabled: true
          },
          min: apexHelper.minimize(this.props.candles)
        }
      },
      series: [{
        name: 'candles',
        type: 'candlestick',
        data: apexHelper.toCandlesSource(this.props.candles)
      }, /* {
        name: 'entries',
        type: 'scatter',
        data: apexHelper.toEntriesSource(apexHelper.dots)
      }*/ ]
    }
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" width={800} />
      </div>
    )
  }
}

export default CandleChart;
