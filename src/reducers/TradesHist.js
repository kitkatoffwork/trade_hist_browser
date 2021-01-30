import { createSlice } from "@reduxjs/toolkit";

const statuses = {
  blank: 0,
  loading: 1,
  success: 2,
  error: 99
}

const slice = createSlice({
  name: 'tradeHist',
  initialState: {
    pareName: 'USD_JPY',
    fromISO: (new Date()).toISOString(),
    toISO: (new Date()).toISOString(),
    status: statuses.blank,
    data: [],
    errorMsg: '',
  },
  reducers: {
    selectPair(state, action) {
      state.pareName = action.payload
    },
    setFromDatetime(state, action) {
      state.fromISO = action.payload
    },
    setToDatetime(state, action) {
      state.toISO = action.payload
    },
    request(state, _action) {
      state.status = statuses.loading
      state.data = []
    },
    receiveResponse(state, action) {
      if (action.payload.errorMsg) {
        state.status = statuses.error
        state.errorMsg = action.payload.errorMsg
      } else {
        state.status = statuses.success
        state.data = action.payload.history
      }
    },
    finishRequest(_state, _action) {}
  }
});

export const {
  selectPair, setFromDatetime, setToDatetime,
  request, receiveResponse, finishRequest
} = slice.actions

export default slice.reducer
