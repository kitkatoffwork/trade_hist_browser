// https://github.com/apexcharts/react-apexcharts
// https://apexcharts.com/react-chart-demos/candlestick-charts/
// https://apexcharts.com/react-chart-demos/candlestick-charts/combo/
// https://dev.classmethod.jp/articles/apexcharts-realtime-line-charts/

import React, { Component } from 'react';
// import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts'

import * as apexHelper from './models/apexHelper'

class SampleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'scatter',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          forceNiceScale: true,
          tooltip: {
            enabled: true
          },
          min: apexHelper.minimize(apexHelper.dots)
        }
      },
      series: [{
        name: 'series-1',
        type: 'candlestick',
        data: apexHelper.toCandlesSource(apexHelper.rawData)
      }, {
        name: 'entries',
        type: 'scatter',
        data: apexHelper.toEntriesSource(apexHelper.dots)
      }]
    }
  }
  render() {
    return (
      /* <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} /> */
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" width={800} />
      </div>
    )
  }
}

export default SampleChart;
