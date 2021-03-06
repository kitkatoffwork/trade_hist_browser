import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

// Demo Sample of chart customization
// https://www.amcharts.com/demos/
// https://www.amcharts.com/demos/date-based-data/
// https://www.amcharts.com/demos/duration-on-value-axis/
// https://www.amcharts.com/demos/stock-chart-candlesticks/
// https://www.amcharts.com/demos/professional-candlesticks/
// https://www.amcharts.com/docs/v4/concepts/bullets/
// https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
// https://www.amcharts.com/docs/v4/concepts/chart-cursor/#Snapping_to_data_items
// INFO: How to add vertical line at the specified point of xAxis
// https://www.amcharts.com/demos/step-count-chart/
// INFO: How to enable user to draw border on the chart
// https://www.amcharts.com/demos/drawing-chart-series-with-mouse-or-touch/

class AmChartSample extends Component {
  componentDidMount() {
    this.chart = prepareChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id='chartdiv' style={{ height: '500px' }}></div>
    );
  }
}

function prepareChart() {
  // ... chart code goes here ...
  const chart = am4core.create('chartdiv', am4charts.XYChart);
  chart.cursor = new am4charts.XYCursor();
  chart.data = candleData;
  chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
  chart.legend = new am4charts.Legend();
  chart.rightAxesContainer.layout = "vertical";
  chart.rightAxesContainer.reverseOrder = true;
  chart.paddingLeft = 20;
  chart.paddingRight = 20;

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.minZoomCount = 5;
  // dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.skipEmptyPeriods = true;
  const range = dateAxis.axisRanges.create();
  range.date = new Date(2018, 7, 15, 12);
  // range.axisFill.fill = am4core.color("#396478");
  // range.axisFill.fillOpacity = 0.2;
  range.grid.stroke = am4core.color("#396478");
  range.grid.strokeOpacity = 0.4;
  range.grid.strokeDasharray = "6, 8"

  const priceAxis = chart.yAxes.push(new am4charts.ValueAxis());
  priceAxis.height = am4core.percent(65);
  setAxesDefaultProps(priceAxis)

  const volumeAxis = chart.yAxes.push(new am4charts.ValueAxis());
  volumeAxis.height = am4core.percent(35);
  volumeAxis.marginTop = 30;
  setAxesDefaultProps(volumeAxis)


  const candlestick = addCandlestick(chart, priceAxis)
  addVolumeSeries(chart, volumeAxis);

  addLineSample(chart);
  addScatterSample(chart);
  addReverseScatter(chart);
  addStoplossScatter(chart)
  addDiamondScatter(chart);

  const scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(candlestick);
  chart.scrollbarX = scrollbarX;
  // chart.scrollbarX = new am4core.Scrollbar();

  return chart;
}

function addCandlestick(chart, axis) {
  const candlestick = chart.series.push(new am4charts.CandlestickSeries());
  candlestick.yAxis = axis;
  candlestick.name = 'candlestick';
  candlestick.clustered = false;
  candlestick.dataFields.dateX = 'date';
  candlestick.dataFields.valueY = 'close';
  candlestick.dataFields.openValueY = 'open';
  candlestick.dataFields.lowValueY = 'low';
  candlestick.dataFields.highValueY = 'high';
  // candlestick.tooltip.pointerOrientation = "vertical";
  candlestick.tooltipText = 'Open: [bold]{openValueY.value}[/]\nLow: [bold]{lowValueY.value}[/]\nHigh: [bold]{highValueY.value}[/]\nClose: [bold]{valueY.value}[/]';

  return candlestick;
}

function setAxesDefaultProps(axis) {
  axis.renderer.inside = true;
  axis.renderer.opposite = true;
  axis.renderer.gridContainer.background.fill = am4core.color("#000000");
  axis.renderer.gridContainer.background.fillOpacity = 0.03;
}

function addVolumeSeries(chart, axis) {
  const series2 = chart.series.push(new am4charts.ColumnSeries());
  series2.dataFields.dateX = "date";
  series2.clustered = false;
  series2.dataFields.valueY = "gross";
  series2.yAxis = axis;
  series2.tooltipText = "{valueY.value}";
  series2.name = "Series 2";
}

function addLineSample(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.name = 'EMA';
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  lineSample.strokeWidth = 2
  lineSample.stroke = chart.colors.getIndex(3);
  lineSample.strokeOpacity = 0.7;
  lineSample.tooltipText = "sample: {valueY}";
  lineSample.data = [
    { 'value': '2018-08-05', 'value2': 140 },
    { 'value': '2018-08-26', 'value2': 170 }
  ];
}

function addScatterSample(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.name = 'Long';
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  // lineSample.strokeWidth = 2
  // lineSample.stroke = chart.colors.getIndex(3);
  lineSample.strokeOpacity = 0.0;
  lineSample.tooltipText = "{valueY}";
  lineSample.data = [
    { 'value': '2018-08-08', 'value2': 140 },
    { 'value': '2018-09-03', 'value2': 142 }
  ];
  addBullet(chart, lineSample);
}

function addReverseScatter(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.name = 'Short';
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  lineSample.strokeOpacity = 0.0;
  lineSample.tooltipText = "{valueY}";
  lineSample.data = [
    { 'value': '2018-08-09', 'value2': 130 },
    { 'value': '2018-09-04', 'value2': 160 }
  ];
  addReverseBullet(chart, lineSample);
}

function addStoplossScatter(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.name = 'stoploss';
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  lineSample.strokeOpacity = 0.0;
  lineSample.tooltipText = "{valueY}";
  lineSample.data = [
    { 'value': '2018-08-09', 'value2': 131 },
    { 'value': '2018-09-04', 'value2': 161 }
  ];
  addHorizontalBullet(chart, lineSample);
}


function addDiamondScatter(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.name = 'Close';
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  lineSample.strokeOpacity = 0.0;
  lineSample.tooltipText = "{valueY}";
  lineSample.data = [
    { 'value': '2018-08-10', 'value2': 135 },
    { 'value': '2018-09-06', 'value2': 155 }
  ];
  addDiamondBullet(chart, lineSample);
}

function addBullet(chart, lineSample) {
  let bullet = lineSample.bullets.push(new am4charts.Bullet());
  // Add a triangle to act as an arrow
  let arrow = bullet.createChild(am4core.Triangle);
  arrow.horizontalCenter = "middle";
  arrow.verticalCenter = "top";
  arrow.stroke = am4core.color('white');
  arrow.strokeWidth = 1.5;
  arrow.fill = chart.colors.getIndex(16);
  arrow.direction = "top";
  arrow.width = 10;
  arrow.height = 10;
}

function addReverseBullet(chart, lineSample) {
  let bullet = lineSample.bullets.push(new am4charts.Bullet());
  // Add a reverse triangle to act as an arrow
  let arrow = bullet.createChild(am4core.Triangle);
  arrow.horizontalCenter = "middle";
  arrow.verticalCenter = "bottom";
  arrow.stroke = am4core.color('white');
  arrow.strokeWidth = 1.5;
  arrow.fill = chart.colors.getIndex(16);
  arrow.direction = "bottom";
  arrow.width = 10;
  arrow.height = 10;
}

function addHorizontalBullet(chart, lineSample) {
  let bullet = lineSample.bullets.push(new am4charts.Bullet());
  let arrow = bullet.createChild(am4core.Rectangle);
  arrow.horizontalCenter = "middle";
  arrow.verticalCenter = "middle";
  arrow.width = 8;
  arrow.height = 2;
}

function addDiamondBullet(chart, lineSample) {
  let bullet = lineSample.bullets.push(new am4plugins_bullets.ShapeBullet());
  // Add a diamond
  bullet.shape = 'diamond';
  bullet.stroke = am4core.color('white');
  bullet.strokeWidth = 1.5;
  bullet.fill = am4core.color('red');
  bullet.width = 8;
  bullet.height = 8;
}

const candleData = [{
  'date': '2018-07-01',
  'open': '136.65',
  'high': '136.96',
  'low': '134.15',
  'close': '136.49',
  'gross': 500,
}, {
  'date': '2018-07-02',
  'open': '135.26',
  'high': '135.95',
  'low': '131.50',
  'close': '131.85',
  'gross': 500,
}, {
  'date': '2018-07-05',
  'open': '132.90',
  'high': '135.27',
  'low': '128.30',
  'close': '135.25',
  'gross': 500,
}, {
  'date': '2018-07-06',
  'open': '134.94',
  'high': '137.24',
  'low': '132.63',
  'close': '135.03',
  'gross': 500,
}, {
  'date': '2018-07-07',
  'open': '136.76',
  'high': '136.86',
  'low': '132.00',
  'close': '134.01',
  'gross': 500,
}, {
  'date': '2018-07-08',
  'open': '131.11',
  'high': '133.00',
  'low': '125.09',
  'close': '126.39',
  'gross': 600,
}, {
  'date': '2018-07-09',
  'open': '123.12',
  'high': '127.75',
  'low': '120.30',
  'close': '125.00',
  'gross': 500,
}, {
  'date': '2018-07-12',
  'open': '128.32',
  'high': '129.35',
  'low': '126.50',
  'close': '127.79',
  'gross': 500,
}, {
  'date': '2018-07-13',
  'open': '128.29',
  'high': '128.30',
  'low': '123.71',
  'close': '124.03',
  'gross': 800,
}, {
  'date': '2018-07-14',
  'open': '122.74',
  'high': '124.86',
  'low': '119.65',
  'close': '119.90',
  'gross': 500,
}, {
  'date': '2018-07-15',
  'open': '117.01',
  'high': '118.50',
  'low': '111.62',
  'close': '117.05',
  'gross': 400,
}, {
  'date': '2018-07-16',
  'open': '122.01',
  'high': '123.50',
  'low': '119.82',
  'close': '122.06',
  'gross': 400,
}, {
  'date': '2018-07-19',
  'open': '123.96',
  'high': '124.50',
  'low': '120.50',
  'close': '122.22',
  'gross': 400,
}, {
  'date': '2018-07-20',
  'open': '122.21',
  'high': '128.96',
  'low': '121.00',
  'close': '127.57',
  'gross': 400,
}, {
  'date': '2018-07-21',
  'open': '131.22',
  'high': '132.75',
  'low': '130.33',
  'close': '132.51',
  'gross': 400,
}, {
  'date': '2018-07-22',
  'open': '133.09',
  'high': '133.34',
  'low': '129.76',
  'close': '131.07',
  'gross': 400,
}, {
  'date': '2018-07-23',
  'open': '130.53',
  'high': '135.37',
  'low': '129.81',
  'close': '135.30',
  'gross': 400,
}, {
  'date': '2018-07-26',
  'open': '133.39',
  'high': '134.66',
  'low': '132.10',
  'close': '132.25',
  'gross': 400,
}, {
  'date': '2018-07-27',
  'open': '130.99',
  'high': '132.41',
  'low': '126.63',
  'close': '126.82',
  'gross': 400,
}, {
  'date': '2018-07-28',
  'open': '129.88',
  'high': '134.18',
  'low': '129.54',
  'close': '134.08',
  'gross': 400,
}, {
  'date': '2018-07-29',
  'open': '132.67',
  'high': '138.25',
  'low': '132.30',
  'close': '136.25',
  'gross': 400,
}, {
  'date': '2018-07-30',
  'open': '139.49',
  'high': '139.65',
  'low': '137.41',
  'close': '138.48',
  'gross': 400,
}, {
  'date': '2018-08-01',
  'open': '136.65',
  'high': '136.96',
  'low': '134.15',
  'close': '136.49',
  'gross': 400,
}, {
  'date': '2018-08-02',
  'open': '135.26',
  'high': '135.95',
  'low': '131.50',
  'close': '131.85',
  'gross': 400,
}, {
  'date': '2018-08-05',
  'open': '132.90',
  'high': '135.27',
  'low': '128.30',
  'close': '135.25',
  'gross': 400,
}, {
  'date': '2018-08-06',
  'open': '134.94',
  'high': '137.24',
  'low': '132.63',
  'close': '135.03',
  'gross': 400,
}, {
  'date': '2018-08-07',
  'open': '136.76',
  'high': '136.86',
  'low': '132.00',
  'close': '134.01',
  'gross': 400,
}, {
  'date': '2018-08-08',
  'open': '131.11',
  'high': '133.00',
  'low': '125.09',
  'close': '126.39',
  'gross': 400,
}, {
  'date': '2018-08-09',
  'open': '123.12',
  'high': '127.75',
  'low': '120.30',
  'close': '125.00',
  'gross': 600,
}, {
  'date': '2018-08-12',
  'open': '128.32',
  'high': '129.35',
  'low': '126.50',
  'close': '127.79',
  'gross': 600,
}, {
  'date': '2018-08-13',
  'open': '128.29',
  'high': '128.30',
  'low': '123.71',
  'close': '124.03',
  'gross': 600,
}, {
  'date': '2018-08-14',
  'open': '122.74',
  'high': '124.86',
  'low': '119.65',
  'close': '119.90',
  'gross': 600,
}, {
  'date': '2018-08-15',
  'open': '117.01',
  'high': '118.50',
  'low': '111.62',
  'close': '117.05',
  'gross': 600,
}, {
  'date': '2018-08-16',
  'open': '122.01',
  'high': '123.50',
  'low': '119.82',
  'close': '122.06',
  'gross': 600,
}, {
  'date': '2018-08-19',
  'open': '123.96',
  'high': '124.50',
  'low': '120.50',
  'close': '122.22',
  'gross': 600,
}, {
  'date': '2018-08-20',
  'open': '122.21',
  'high': '128.96',
  'low': '121.00',
  'close': '127.57',
  'gross': 600,
}, {
  'date': '2018-08-21',
  'open': '131.22',
  'high': '132.75',
  'low': '130.33',
  'close': '132.51',
  'gross': 800,
}, {
  'date': '2018-08-22',
  'open': '133.09',
  'high': '133.34',
  'low': '129.76',
  'close': '131.07',
  'gross': 1100,
}, {
  'date': '2018-08-23',
  'open': '130.53',
  'high': '135.37',
  'low': '129.81',
  'close': '135.30',
  'gross': 1100,
}, {
  'date': '2018-08-26',
  'open': '133.39',
  'high': '134.66',
  'low': '132.10',
  'close': '132.25',
  'gross': 1100,
}, {
  'date': '2018-08-27',
  'open': '130.99',
  'high': '132.41',
  'low': '126.63',
  'close': '126.82',
  'gross': 1100,
}, {
  'date': '2018-08-28',
  'open': '129.88',
  'high': '134.18',
  'low': '129.54',
  'close': '134.08',
  'gross': 300,
}, {
  'date': '2018-08-29',
  'open': '132.67',
  'high': '138.25',
  'low': '132.30',
  'close': '136.25',
  'gross': 300,
}, {
  'date': '2018-08-30',
  'open': '139.49',
  'high': '139.65',
  'low': '137.41',
  'close': '138.48',
  'gross': 300,
}, {
  'date': '2018-09-03',
  'open': '139.94',
  'high': '145.73',
  'low': '139.84',
  'close': '144.16',
  'gross': 300,
}, {
  'date': '2018-09-04',
  'open': '144.97',
  'high': '145.84',
  'low': '136.10',
  'close': '136.76',
  'gross': 300,
}, {
  'date': '2018-09-05',
  'open': '135.56',
  'high': '137.57',
  'low': '132.71',
  'close': '135.01',
  'gross': 300,
}, {
  'date': '2018-09-06',
  'open': '132.01',
  'high': '132.30',
  'low': '130.00',
  'close': '131.77',
  'gross': 600,
}, {
  'date': '2018-09-09',
  'open': '136.99',
  'high': '138.04',
  'low': '133.95',
  'close': '136.71',
  'gross': 600,
}, {
  'date': '2018-09-10',
  'open': '137.90',
  'high': '138.30',
  'low': '133.75',
  'close': '135.49',
  'gross': 600,
}, {
  'date': '2018-09-11',
  'open': '135.99',
  'high': '139.40',
  'low': '135.75',
  'close': '136.85',
  'gross': 600,
}, {
  'date': '2018-09-12',
  'open': '138.83',
  'high': '139.00',
  'low': '136.65',
  'close': '137.20',
  'gross': 600,
}, {
  'date': '2018-09-13',
  'open': '136.57',
  'high': '138.98',
  'low': '136.20',
  'close': '138.81',
  'gross': 600,
}, {
  'date': '2018-09-16',
  'open': '138.99',
  'high': '140.59',
  'low': '137.60',
  'close': '138.41',
  'gross': 600,
}, {
  'date': '2018-09-17',
  'open': '139.06',
  'high': '142.85',
  'low': '137.83',
  'close': '140.92',
  'gross': 600,
}, {
  'date': '2018-09-18',
  'open': '143.02',
  'high': '143.16',
  'low': '139.40',
  'close': '140.77',
  'gross': 600,
}, {
  'date': '2018-09-19',
  'open': '140.15',
  'high': '141.79',
  'low': '139.32',
  'close': '140.31',
  'gross': 700,
}, {
  'date': '2018-09-20',
  'open': '141.14',
  'high': '144.65',
  'low': '140.31',
  'close': '144.15',
  'gross': 700,
}, {
  'date': '2018-09-23',
  'open': '146.73',
  'high': '149.85',
  'low': '146.65',
  'close': '148.28',
  'gross': 700,
}, {
  'date': '2018-09-24',
  'open': '146.84',
  'high': '153.22',
  'low': '146.82',
  'close': '153.18',
  'gross': 700,
}, {
  'date': '2018-09-25',
  'open': '154.47',
  'high': '155.00',
  'low': '151.25',
  'close': '152.77',
  'gross': 700,
}, {
  'date': '2018-09-26',
  'open': '153.77',
  'high': '154.52',
  'low': '152.32',
  'close': '154.50',
  'gross': 700,
}, {
  'date': '2018-09-27',
  'open': '153.44',
  'high': '154.60',
  'low': '152.75',
  'close': '153.47',
  'gross': 700,
}, {
  'date': '2018-09-30',
  'open': '154.63',
  'high': '157.41',
  'low': '152.93',
  'close': '156.34',
  'gross': 700,
}, {
  'date': '2018-10-01',
  'open': '156.55',
  'high': '158.59',
  'low': '155.89',
  'close': '158.45',
  'gross': 700,
}, {
  'date': '2018-10-02',
  'open': '157.78',
  'high': '159.18',
  'low': '157.01',
  'close': '157.92',
  'gross': 700,
}, {
  'date': '2018-10-03',
  'open': '158.00',
  'high': '158.08',
  'low': '153.50',
  'close': '156.24',
  'gross': 700,
}, {
  'date': '2018-10-04',
  'open': '158.37',
  'high': '161.58',
  'low': '157.70',
  'close': '161.45',
  'gross': 700,
}, {
  'date': '2018-10-07',
  'open': '163.49',
  'high': '167.91',
  'low': '162.97',
  'close': '167.91',
  'gross': 700,
}, {
  'date': '2018-10-08',
  'open': '170.20',
  'high': '171.11',
  'low': '166.68',
  'close': '167.86',
  'gross': 700,
}, {
  'date': '2018-10-09',
  'open': '167.55',
  'high': '167.88',
  'low': '165.60',
  'close': '166.79',
  'gross': 700,
}, {
  'date': '2018-10-10',
  'open': '169.49',
  'high': '171.88',
  'low': '153.21',
  'close': '162.23',
  'gross': 700,
}, {
  'date': '2018-10-11',
  'open': '163.01',
  'high': '167.28',
  'low': '161.80',
  'close': '167.25',
  'gross': 700,
}, {
  'date': '2018-10-14',
  'open': '167.98',
  'high': '169.57',
  'low': '163.50',
  'close': '166.98',
  'gross': 700,
}, {
  'date': '2018-10-15',
  'open': '165.54',
  'high': '170.18',
  'low': '165.15',
  'close': '169.58',
  'gross': 700,
}, {
  'date': '2018-10-16',
  'open': '172.69',
  'high': '173.04',
  'low': 169.18,
  'close': 172.75,
  'gross': 700,
}];

export default AmChartSample;
