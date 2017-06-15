import fetch from 'isomorphic-fetch'
import {actionTypes} from '../constants/ActionTypes';
import type { Action, Dispatch, GetState } from '../types';


export function requestDatasetCount():Action {
  return {
    type: actionTypes.REQUEST_DATASET_COUNT,
  }
}

export function receiveDatasetCount(count: number): Action {
  return {
    type: actionTypes.RECEIVE_DATASET_COUNT,
    payload: count
  }
}

export function fetchDatasetCountError(error: number): Action {
  return {
    type: actionTypes.FETCH_DATASET_COUNT_ERROR,
    error,
  }
}




export function fetchDatasetCount(){
  return (dispatch: Dispatch, getState: GetState)=>{
      // check if we need to fetch
      if(getState().stats.isFetchingDatasetCount){
        return false;
      }
      dispatch(requestDatasetCount())
      const url = "http://104.199.180.124/api/v0/registry/records?limit=0&aspect=dcat-dataset-strings";
      fetch(url)
      .then(response=>{
        if (response.status !== 200) {
          console.log("error")
          dispatch(fetchDatasetCountError(response.status));
        }
        else {
          return response.json()
        }
      }).then(result=>{
          if(!result.error){
            dispatch(receiveDatasetCount(result.totalCount));
          }
      });
  }
}
