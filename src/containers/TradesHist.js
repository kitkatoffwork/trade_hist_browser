import { connect } from 'react-redux';
import TradesHist from '../components/TradesHist';
import * as actions from '../actions/TradesHist';

const mapStateToProps = (state, ownProps) => ({
  // pareName: ownProps.pareName,
  pareName: state.requestReducer.pareName,
  fromISO: state.requestReducer.fromISO,
  toISO: state.requestReducer.toISO,
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
  setFromDatetime(fromISO) {
    dispatch(actions.setFromDatetime(fromISO));
  },
  setToDatetime(toISO) {
    dispatch(actions.setToDatetime(toISO));
  },
  request(pareName, fromISO, toISO) {
    dispatch(actions.requestHist(pareName, fromISO, toISO));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradesHist);
