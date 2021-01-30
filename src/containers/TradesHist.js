import { connect } from 'react-redux';
import axios from 'axios';
import TradesHist from '../components/TradesHist';
import {
  // Actions
  setIndicatorNames, changeSelectedIndicators,
  selectPair, setFromDatetime, setToDatetime,
  request, receiveResponse, finishRequest
} from '../reducers/TradesHist';

const API_URL = process.env.REACT_APP_HIST_API_URL

const requestIndicatorNames = () => async dispatch => {
  // ここでREST APIの呼び出しをする
  // const response = await axios.get(API_URL + '/indicator_names')
  await axios.get(API_URL + '/indicator_names')
    .then(response => {
      dispatch(setIndicatorNames(response.data));
    }
  );
};

const requestHist = (pareName, fromISO, toISO) => {
  return async dispatch => {
    dispatch(request());

    try {
      const response = await fetch(
        API_URL + `/tradehist?pareName=${pareName}&from=${fromISO}&to=${toISO}`, {
          // mode: 'cors' // なくてもCORS対応できてる
          // headers: {'Content-Type': 'application/json'},
          // method: 'POST',
          // body: JSON.stringify({aa: 'dwa', bere: 13456})
        }
      );
      const parsed_response = await response.json();
      const status = await response.status;

      if (status === 200) {
        const history = parsed_response.history;
        dispatch(receiveResponse(
          { pareName: pareName, errorMsg: null, history: history }
        ));
      } else {
        dispatch(receiveResponse(
          { pareName: pareName, errorMsg: parsed_response.message }
        ));
      }
    } catch (error) {
      dispatch(receiveResponse(
        { pareName: pareName, errorMsg: error.message })
      );
    } finally {
      dispatch(finishRequest(pareName));
    }
  };
};

const mapStateToProps = (state, ownProps) => ({
  // pareName: ownProps.pareName,
  indicatorNames: state.requestReducer.indicatorNames,
  selectedIndicators: state.requestReducer.selectedIndicators,
  pareName: state.requestReducer.pareName,
  fromISO: state.requestReducer.fromISO,
  toISO: state.requestReducer.toISO,
  status: state.requestReducer.status,
  data: state.requestReducer.data,
  errorMsg: state.requestReducer.errorMsg
});

const mapDispatchToProps = (dispatch) => ({
  onMount() {
    dispatch(requestIndicatorNames());
  },
  onUpdate(pareName) {
    dispatch(requestHist(pareName));
  },
  selectPair(pairName) {
    dispatch(selectPair(pairName));
  },
  changeSelectedIndicators(selected) {
    dispatch(changeSelectedIndicators(selected))
  },
  setFromDatetime(fromISO) {
    dispatch(setFromDatetime(fromISO));
  },
  setToDatetime(toISO) {
    dispatch(setToDatetime(toISO));
  },
  request(pareName, fromISO, toISO) {
    dispatch(requestHist(pareName, fromISO, toISO));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradesHist);
