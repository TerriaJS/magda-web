// @flow 
import type { Action, FacetSearchState } from '../types';

const initialData = {
  isFetching: false,
  data: [],
  generalQuery: '',
  facetQuery: ''
}

const facetFormatSearch = (state: FacetSearchState=initialData, action: Action) => {
  switch (action.type) {
    case 'FACET_REQUEST_FORMATS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'FACET_RECEIVE_FORMATS':
      return Object.assign({}, state, {
        isFetching: false,
        data: (action.json && action.json.options) && action.json.options,
        generalQuery: action.generalQuery && action.generalQuery,
        facetQuery: action.facetQuery && action.facetQuery
      })
    default:
      return state
  }
};
export default facetFormatSearch;
