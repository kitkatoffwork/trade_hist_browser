const API_URL = 'https://ft30m5906e.execute-api.us-east-2.amazonaws.com/default/tradehist'

export const selectPair = (pareName) => ({
  type: 'SELECT_PAIR',
  payload: { pareName }
});
const request = (pareName) => ({
  type: 'REQUEST',
  payload: { pareName }
});
const receiveData = (pareName, error, response) => ({
  type: 'RECEIVE_RESPONSE',
  payload: { pareName, error, response }
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
      dispatch(receiveData(pareName, null, data));
    } catch (error) {
      dispatch(receiveData(pareName, error));
    }
    dispatch(finishRequest(pareName));
  };
};
