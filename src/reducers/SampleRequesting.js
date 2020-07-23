const initialState = {
  pareName: '',
  data: 'undefined',
  error: false
}

const extractData = response => {
  return JSON.parse(response.body);
}

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST':
      return {
        pareName: action.payload.pareName,
        data: 'undefined',
        error: false
      };
    case 'RECEIVE_RESPONSE':
      return action.payload.error
        ? { ...state, error: true }
        : { ...state, data: extractData(action.payload.response) };
    case 'FINISH_REQUEST':
      return {
        ...state,
        // data: state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}
