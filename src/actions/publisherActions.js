// @flow

import fetch from 'isomorphic-fetch'
import {config} from '../config'
import {actionTypes} from '../constants/ActionTypes';
import type { Action } from '../types';

export function requestPublishers():Action {
  return {
    type: actionTypes.REQUEST_PUBLISHERS,
  }
}

export function receivePublishers(json: Object): Action {
  return {
    type: actionTypes.RECEIVE_PUBLISHERS,
    json,
  }
}

export function requestPublishersError(error: Object): Action {
  return {
    type: actionTypes.REQUEST_PUBLISHERS_ERROR,
    error,
  }
}

export function publishersNotFound(): Action {
    return {
        type: actionTypes.PUBLISHERS_NOT_FOUND
    }
}

function fetchPublishers(start){
    return (dispatch: Function) => {
        dispatch(requestPublishers());
        const url = `${config.searchApiBaseUrl}facets/publisher/options?generalQuery=*&facetQuery=*&limit=${config.resultsPerPage}&start=${start}` 
        return fetch(url)
            .then(response => {
                if (response.status >= 400) {
                if(response.status === 404){
                    return dispatch(publishersNotFound());
                }
                    return dispatch(requestPublishersError(response));
                } 
                return response.json();
            })
            .then((json) => dispatch(receivePublishers(json))
            )
    }
}

function shouldFetchPublishers(state){
    const publisher = state.publisher;
    if(publisher.isFetching){
        return false;
    }
    return true;
}


export function fetchPublishersIfNeeded(start):Object{
  return (dispatch: Function, getState: Function)=>{
      if(shouldFetchPublishers(getState())){
          return dispatch(fetchPublishers(start))
      } else{
          return Promise.resolve();
      }
  }
}

