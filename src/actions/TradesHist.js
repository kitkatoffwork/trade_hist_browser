const API_URL = 'https://ft30m5906e.execute-api.us-east-2.amazonaws.com/default/tradehist'

export const selectPair = (pareName) => ({
  type: 'SELECT_PAIR',
  payload: { pareName }
});
const request = (pareName) => ({
  type: 'REQUEST',
  payload: { pareName }
});
const receiveData = (pareName, errorMsg, response) => ({
  type: 'RECEIVE_RESPONSE',
  payload: { pareName, errorMsg, response }
});
const finishRequest = (pareName) => ({
  type: 'FINISH_REQUEST',
  payload: { pareName }
});

export const requestHist = (pareName) => {
  return async dispatch => {
    dispatch(request(pareName));

    try {
      const response = await fetch(
        API_URL + `?pareName=${pareName}`, {
          // headers: {'Content-Type': 'application/json'},
          // method: 'POST',
          // body: JSON.stringify({aa: 'dwa', bere: 13456})
        }
      );
      const data = await response.json();
      const status = await response.status;

      if (status === 200) {
        dispatch(receiveData(pareName, null, data));
      } else {
        dispatch(receiveData(pareName, data.message));
      }
    } catch (error) {
      dispatch(receiveData(pareName, error.message));
    } finally {
      dispatch(finishRequest(pareName));
    }
  };
};
