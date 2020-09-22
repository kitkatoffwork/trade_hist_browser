import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);


class CandleChart extends Component {
  componentDidMount() {
    this.chart = this.prepareChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  prepareChart() {
    // ... chart code goes here ...
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.cursor = new am4charts.XYCursor();
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH';
    chart.paddingRight = 20;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.skipEmptyPeriods = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    const candlestick = this.addCandlestick(chart);
    // addLineSample(chart);
    // addScatterSample(chart)

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(candlestick);
    chart.scrollbarX = scrollbarX;

    return chart;
  }

  addCandlestick(chart) {
    const candlestick = chart.series.push(new am4charts.CandlestickSeries());
    candlestick.dataFields.dateX = 'time';
    candlestick.dataFields.valueY = 'close';
    candlestick.dataFields.openValueY = 'open';
    candlestick.dataFields.lowValueY = 'low';
    candlestick.dataFields.highValueY = 'high';
    candlestick.tooltipText = 'Open: [bold]{openValueY.value}[/]\nLow: [bold]{lowValueY.value}[/]\nHigh: [bold]{highValueY.value}[/]\nClose: [bold]{valueY.value}[/]';

    chart.data = this.props.candles;
    console.log(this.props.candles);

    return candlestick;
  }

  render() {
    return (
      <div id='chartdiv' style={{ width: '90%', height: '500px' }}></div>
    );
  }
}

export default CandleChart;
