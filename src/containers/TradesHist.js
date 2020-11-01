import { connect } from 'react-redux';
import TradesHist from '../components/TradesHist';
import * as actions from '../actions/TradesHist';

const mapStateToProps = (state, ownProps) => ({
  // pareName: ownProps.pareName,
  pareName: state.requestReducer.pareName,
  data: state.requestReducer.data,
  error: state.requestReducer.error
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
  request(pareName) {
    dispatch(actions.requestHist(pareName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradesHist);
