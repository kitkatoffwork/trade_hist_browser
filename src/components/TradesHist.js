import PropTypes from 'prop-types';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import {
  withStyles,
  Container,
  Button,
  CircularProgress,
  Card, CardActions, CardContent,
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';

import PareSelector from '../templates/PareSelector'
import PastDatePicker from '../templates/PastDatePicker'
import CandleChart from './candle_chart';

const styles = theme => ({
  container: {
    maxHeight: 300,
    margin: theme.spacing(1),
  },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  // },
});

class TradesHist extends React.Component {
  // INFO: 画面初期描画と同時にグラフも描画する場合はこれをコメントイン
  // componentDidMount() {
  //   this.props.onMount(this.props.pareName);
  // }

  /* この componentDidUpdate をコメントアウトしても、少なくとも初回は request が飛んでいる */
  // componentDidUpdate(nextProps) {
  //   if (this.props.pareName !== nextProps.pareName) {
  //     this.props.onUpdate(nextProps.pareName);
  //   }
  // }

  render() {
    const {
      classes,
      selectPair, setFromDatetime, request,
      pareName, fromDatetime, status, data, errorMsg
    } = this.props;

    return (
      <Container>
        <h2>TradesHist Component</h2>
        <p>Pare Name: {pareName}</p>

        {/* </Container><FormControl size="small" variant="outlined" className={props.className}> */}
        <PareSelector value={pareName}
                      onChangeCallback={(e) => selectPair(e.target.value)} />
        <PastDatePicker value={fromDatetime}
                        onChangeCallback={(date, _event) => setFromDatetime(date)} />
        <Button size="small"
                color="primary"
                variant="contained"
                onClick={() => request(pareName, fromDatetime)} disabled={status === 1}>
          Load Hist
        </Button>

        <Card variant="outlined">
          {(this.renderHistTable)(classes, status, data, errorMsg)}
        </Card>
      </Container>
    )
  }

  renderHistTable (classes, status, data, errorMsg) {
    if (status === 99) {
      return <p>Error: {errorMsg}</p>
    } else if (status === 0) {
      return null
    } else if (status === 1) {
      return <><CircularProgress />Now Loading ...</>
    } else if (status === 2) {
      return(
        <>
          <CandleChart candles={data.slice(-400)} />
          <CardContent>
            <TableContainer className={classes.container} component={Paper}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>time</TableCell>
                    <TableCell>open</TableCell>
                    <TableCell>high</TableCell>
                    <TableCell>low</TableCell>
                    <TableCell>close</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map( (datum, i) => (
                    <TableRow key={`candle-${i}`}>
                      <TableCell>{datum.time}</TableCell>
                      <TableCell>{datum.open}</TableCell>
                      <TableCell>{datum.high}</TableCell>
                      <TableCell>{datum.low}</TableCell>
                      <TableCell>{datum.close}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </>
      );
    }
  }
}

export default withStyles(styles, )(TradesHist);

TradesHist.propTypes = {
  classes: PropTypes.object.isRequired,
  // onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectPair: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  pareName: PropTypes.string.isRequired,
  fromDatetime: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  errorMsg: PropTypes.string.isRequired,
  // data: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.arrayOf(
  //     PropTypes.shape({
  //       hoge: PropTypes.number,
  //       huga: PropTypes.bool,
  //     })
  //   )
  // ]),
};
