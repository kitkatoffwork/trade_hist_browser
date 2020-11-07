
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import actions from './TradesHist';

// INFO: redux の store モックの作成
const middlewears = [thunk];
const mockStore = configureMockStore(middlewears);

describe.skip('Actions', () => {
  test('requestHist Action Creator', () => {
    const pareName = 'USD_JPY';
    fetch.mockResponse(JSON.stringify(pareName));

    const expected = [{
      type: 'REQUEST',
      payload: { pareName }
    }, {
      type: 'RECEIVE_RESPONSE',
      payload: {
        pareName: pareName,
        error: undefined,
        response: 'a'
      }
    }, {
      type: 'FINISH_REQUEST',
      payload: { pareName }
    }]
    const store = mockStore();

    return store.dispatch(actions.requestHist())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  })
});
