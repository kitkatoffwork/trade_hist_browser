import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
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
    chart.data = this.props.candles;
    console.log(this.props.candles);

    /* --------------------------------------------
                    Common Settings
    -------------------------------------------- */
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 10; // px between the target point and mouse-cursor
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH';
    chart.legend = new am4charts.Legend();
    chart.paddingRight = 20;
    chart.rightAxesContainer.layout = "vertical";
    chart.rightAxesContainer.reverseOrder = true;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.skipEmptyPeriods = true;
    dateAxis.tooltipDateFormat = "MM-dd HH:00";
    // dateAxis.groupData = true;
    // dateAxis.minZoomCount = 3;

    /* --------------------------------------------
                      Main Axis
    -------------------------------------------- */
    const mainAxis = chart.yAxes.push(new am4charts.ValueAxis());
    this.setAxesDefaultProps(mainAxis)
    mainAxis.renderer.minWidth = 35;

    const candlestick = this.addCandlestick(chart);
    // this.addLineSample(chart);
    this.addEntryScatter(chart, 'long', this.addBullet);
    this.addEntryScatter(chart, 'short', this.addReverseBullet);
    this.addEntryScatter(chart, 'exit', this.addDiamondBullet);
    this.addEntryScatter(chart, 'stoploss', this.addHorizontalBullet);

    /* --------------------------------------------
                      Volume Axis
    -------------------------------------------- */
    const volumeAxis = chart.yAxes.push(new am4charts.ValueAxis());
    volumeAxis.height = am4core.percent(50);
    volumeAxis.marginTop = 20;
    this.setAxesDefaultProps(volumeAxis)
    this.addVolumeSeries(chart, "pl", volumeAxis);
    this.addVolumeSeries(chart, "gross", volumeAxis);

    /* --------------------------------------------
                    Common Settings
    -------------------------------------------- */
    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(candlestick);
    chart.scrollbarX = scrollbarX;

    return chart;
  }

  setAxesDefaultProps(axis) {
    // axis.renderer.inside = true;
    axis.renderer.opposite = true;
    axis.renderer.gridContainer.background.fill = am4core.color("#000000");
    axis.renderer.gridContainer.background.fillOpacity = 0.03;
  }

  addCandlestick(chart) {
    const candlestick = chart.series.push(new am4charts.CandlestickSeries());
    candlestick.name = 'candlestick';
    candlestick.dataFields.dateX = 'time';
    candlestick.dataFields.valueY = 'close';
    candlestick.dataFields.openValueY = 'open';
    candlestick.dataFields.lowValueY = 'low';
    candlestick.dataFields.highValueY = 'high';
    candlestick.tooltipText = 'Open: [bold]{openValueY.value}[/]\nLow: [bold]{lowValueY.value}[/]\nHigh: [bold]{highValueY.value}[/]\nClose: [bold]{valueY.value}[/]';

    this.setTooltipProps(candlestick);
    return candlestick;
  }

  addEntryScatter(chart, target, addBullet) {
    const invisibleSeries = chart.series.push(new am4charts.LineSeries());
    invisibleSeries.name = target;
    invisibleSeries.dataFields.dateX = 'time';
    invisibleSeries.dataFields.valueY = target;
    // invisibleSeries.minBulletDistance = 15;
    invisibleSeries.strokeOpacity = 0.0;
    invisibleSeries.tooltipText = `${target}: {${target}}`;
    invisibleSeries.data = this.props.candles;

    this.setTooltipProps(invisibleSeries);
    addBullet(chart, invisibleSeries);
  }

  addBullet(chart, invisibleSeries) {
    let bullet = invisibleSeries.bullets.push(new am4charts.Bullet());
    // Add a triangle to act as am arrow
    const arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "top";
    arrow.stroke = am4core.color('white');
    arrow.strokeWidth = 1.5;
    arrow.fill = chart.colors.getIndex(16);
    arrow.direction = "top";
    arrow.width = 10;
    arrow.height = 10;
  }

  addReverseBullet(chart, invisibleSeries) {
    let bullet = invisibleSeries.bullets.push(new am4charts.Bullet());
    // Add a reverse triangle to act as an arrow
    const arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "bottom";
    arrow.stroke = am4core.color('white');
    arrow.strokeWidth = 1.5;
    arrow.fill = chart.colors.getIndex(0);
    arrow.direction = "bottom";
    arrow.width = 10;
    arrow.height = 10;
  }

  addHorizontalBullet(chart, invisibleSeries) {
    let bullet = invisibleSeries.bullets.push(new am4charts.Bullet());
    const hBar = bullet.createChild(am4core.Rectangle);
    hBar.horizontalCenter = "middle";
    hBar.verticalCenter = "middle";
    hBar.stroke = chart.colors.getIndex(30);
    hBar.strokeOpacity = 0.7;
    hBar.fill = chart.colors.getIndex(30);
    hBar.fillOpacity = 0.7;
    hBar.width = 8;
    hBar.height = 2;
  }

  addDiamondBullet(chart, invisibleSeries) {
    let bullet = invisibleSeries.bullets.push(new am4plugins_bullets.ShapeBullet());
    // Add a diamond
    bullet.shape = 'diamond';
    bullet.stroke = am4core.color('white');
    bullet.strokeWidth = 1.5;
    bullet.fill = am4core.color('red');
    bullet.fillOpacity = 0.5;
    bullet.width = 6;
    bullet.height = 6;
  }

  addVolumeSeries(chart, targetValName, axis) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.clustered = false;
    series.dataFields.dateX = "time";
    series.dataFields.valueY = targetValName;
    series.yAxis = axis;
    series.fillOpacity = targetValName === 'gross' ? 0.5 : 1.0;
    series.strokeOpacity = targetValName === 'gross' ? 0.5 : 1.0;
    series.tooltipText = `${targetValName}: {valueY.value}`;
    series.name = targetValName;
  }

  setTooltipProps(series) {
    // series.tooltip.getFillFromObject = false;
    // series.tooltip.label.propertyFields.fill = "color";
    // series.tooltip.background.propertyFields.stroke = "color";
    // series.tooltip.disabled = true;
    series.tooltip.pointerOrientation = "left";
    series.tooltip.dx = 5;
  }

  render() {
    return (
      <div id='chartdiv' style={{ height: '500px' }}></div>
    );
  }
}

export default CandleChart;
