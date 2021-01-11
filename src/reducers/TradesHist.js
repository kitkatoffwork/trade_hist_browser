const statuses = {
  blank: 0,
  loading: 1,
  success: 2,
  error: 99
}

const initialState = {
  pareName: 'USD_JPY',
  fromDatetime: new Date(),
  toDatetime: new Date(),
  status: statuses.blank,
  data: [],
  errorMsg: '',
}

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_PAIR':
      return {
        ...state,
        pareName: action.payload.pareName,
      };
    case 'SET_FROM_DATETIME':
      return {
        ...state,
        fromDatetime: action.payload.fromDatetime,
      };
    case 'SET_TO_DATETIME':
      return {
        ...state,
        toDatetime: action.payload.toDatetime,
      };
    case 'REQUEST':
      return {
        ...state,
        status: statuses.loading,
        data: [],
      };
    case 'RECEIVE_RESPONSE':
      return action.payload.errorMsg
        ? { ...state, status: statuses.error, errorMsg: action.payload.errorMsg }
        : { ...state, status: statuses.success, data: action.payload.response };
    case 'FINISH_REQUEST':
      return {
        ...state,
        // data: state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}
