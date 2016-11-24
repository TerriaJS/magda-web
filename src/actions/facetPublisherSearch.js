import fetch from 'isomorphic-fetch'
import config from '../config'

export const REQUEST_PUBLISHERS = 'REQUEST_PUBLISHERS'
export const RECEIVE_PUBLISHERS = 'RECEIVE_PUBLISHERS'

export function requestPublishers(generalQuery, facetQuery){
  return {
    type: REQUEST_PUBLISHERS,
    generalQuery,
    facetQuery
  }
}

export function receivePublishers(generalQuery, facetQuery, json){
  return {
    type: RECEIVE_PUBLISHERS,
    json: json,
    generalQuery,
    facetQuery
  }
}

export function fetchPublisherSearchResults(generalQuery, facetQuery) {
  return (dispatch)=>{
    dispatch(requestPublishers(generalQuery, facetQuery))
    return fetch(config().searchApiBaseUrl + `facets/publisher/options/search?generalQuery=${generalQuery}&facetQuery=${facetQuery}`)
    .then(response => response.json())
    .then(json =>
      dispatch(receivePublishers(generalQuery, facetQuery, json))
    )
  }
}
