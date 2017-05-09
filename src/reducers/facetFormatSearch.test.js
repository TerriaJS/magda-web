import {actionTypes} from '../constants/ActionTypes';
import reducer from './facetFormatSearch';

describe('format search reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        isFetching: false,
        query: {generalQuery: '', facetQuery: ''},
        data: []
      }
    )
  });

  it('should handle FACET_REQUEST_FORMATS', () => {
    expect(
      reducer([], {
        type: actionTypes.FACET_REQUEST_FORMATS
      })
    ).toEqual(
      {
        isFetching: true
      }
    )
  });

  it('should handle FACET_RECEIVE_FORMATS', () => {
    const json = {
      options: []
    }
    expect(
      reducer([], {
        type: actionTypes.FACET_RECEIVE_FORMATS,
        generalQuery: '',
        facetQuery: '',
        json
      })
    ).toEqual(
      {
        isFetching: false,
        data: [],
        facetQuery: "",
        generalQuery: ""
      }
    )
  });
});
