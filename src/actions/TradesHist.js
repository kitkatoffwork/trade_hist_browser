const API_URL = process.env.REACT_APP_HIST_API_URL

export const selectPair = (pareName) => ({
  type: 'SELECT_PAIR',
  payload: { pareName }
});
export const setFromDatetime = (fromDatetime) => ({
  type: 'SET_FROM_DATETIME',
  payload: { fromDatetime }
});
export const setToDatetime = (toDatetime) => ({
  type: 'SET_TO_DATETIME',
  payload: { toDatetime }
});
const request = () => ({
  type: 'REQUEST',
  payload: {}
});
const receiveData = (pareName, errorMsg, response) => ({
  type: 'RECEIVE_RESPONSE',
  payload: { pareName, errorMsg, response }
});
const finishRequest = (pareName) => ({
  type: 'FINISH_REQUEST',
  payload: { pareName }
});

export const requestHist = (pareName, fromDatetime, toDatetime) => {
  return async dispatch => {
    dispatch(request());

    try {
      const isoFrom = fromDatetime.toISOString()
      const isoTo = toDatetime.toISOString()
      const response = await fetch(
        API_URL + `?pareName=${pareName}&from=${isoFrom}&to=${isoTo}`, {
          // headers: {'Content-Type': 'application/json'},
          // method: 'POST',
          // body: JSON.stringify({aa: 'dwa', bere: 13456})
        }
      );
      const parsed_response = await response.json();
      const status = await response.status;

      if (status === 200) {
        const history = parsed_response.history;
        dispatch(receiveData(pareName, null, history));
      } else {
        dispatch(receiveData(pareName, parsed_response.message));
      }
    } catch (error) {
      dispatch(receiveData(pareName, error.message));
    } finally {
      dispatch(finishRequest(pareName));
    }
  };
};
