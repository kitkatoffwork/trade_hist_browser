// https://github.com/apexcharts/react-apexcharts
// https://apexcharts.com/react-chart-demos/candlestick-charts/
// https://apexcharts.com/react-chart-demos/candlestick-charts/combo/
// https://dev.classmethod.jp/articles/apexcharts-realtime-line-charts/

import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class SampleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }]
    }
  }
  render() {
    return (
      <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
    )
  }
}

export default SampleChart;
