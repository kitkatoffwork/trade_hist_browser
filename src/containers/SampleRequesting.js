import { connect } from 'react-redux';
import SampleRequesting from '../components/SampleRequesting';
import * as actions from '../actions/SampleRequesting';

const mapStateToProps = (state, ownProps) => ({
  pareName: ownProps.pareName,
});

const mapDispatchToProps = (dispatch) => ({
  onMount(pareName) {
    dispatch(actions.requestHist(pareName));
  },
  onUpdate(pareName) {
    dispatch(actions.requestHist(pareName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleRequesting);
