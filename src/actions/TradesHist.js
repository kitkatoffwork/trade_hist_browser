const API_URL = process.env.REACT_APP_HIST_API_URL

export const selectPair = (pareName) => ({
  type: 'SELECT_PAIR',
  payload: { pareName }
});
export const setFromDatetime = (fromISO) => ({
  type: 'SET_FROM_DATETIME',
  payload: { fromISO }
});
export const setToDatetime = (toISO) => ({
  type: 'SET_TO_DATETIME',
  payload: { toISO }
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

export const requestHist = (pareName, fromISO, toISO) => {
  return async dispatch => {
    dispatch(request());

    try {
      const response = await fetch(
        API_URL + `?pareName=${pareName}&from=${fromISO}&to=${toISO}`, {
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
