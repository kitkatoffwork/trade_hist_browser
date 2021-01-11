import { connect } from 'react-redux';
import TradesHist from '../components/TradesHist';
import * as actions from '../actions/TradesHist';

const mapStateToProps = (state, ownProps) => ({
  // pareName: ownProps.pareName,
  pareName: state.requestReducer.pareName,
  fromDatetime: state.requestReducer.fromDatetime,
  toDatetime: state.requestReducer.toDatetime,
  status: state.requestReducer.status,
  data: state.requestReducer.data,
  errorMsg: state.requestReducer.errorMsg
});

const mapDispatchToProps = (dispatch) => ({
  // onMount(pareName) {
  //   dispatch(actions.requestHist(pareName));
  // },
  onUpdate(pareName) {
    dispatch(actions.requestHist(pareName));
  },
  selectPair(pairName) {
    dispatch(actions.selectPair(pairName));
  },
  setFromDatetime(fromDatetime) {
    dispatch(actions.setFromDatetime(fromDatetime));
  },
  setToDatetime(toDatetime) {
    dispatch(actions.setToDatetime(toDatetime));
  },
  request(pareName, fromDatetime, toDatetime) {
    dispatch(actions.requestHist(pareName, fromDatetime, toDatetime));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradesHist);
