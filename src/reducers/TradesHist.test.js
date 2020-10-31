import reducer from './TradesHist';

describe('TradesHist Reducer', () => {
  const initialState = { pareName: '', data: 'undefined', error: false }
  test('初期値', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = initialState;

    expect(result).toEqual(expected);
  });

  test('REQUEST アクション', () => {
    const state = initialState;
    const action = {
      type: 'REQUEST',
      payload: { pareName: 'USD_JPY' }
    };
    const result = reducer(state, action);
    const expected = {
      pareName: 'USD_JPY', data: 'undefined', error: false
    };

    expect(result).toEqual(expected);
  });
});
