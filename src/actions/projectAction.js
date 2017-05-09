// @flow

import fetch from 'isomorphic-fetch'
import {config} from '../config'
import {actionTypes} from '../constants/ActionTypes';
import type { Action } from '../types';

export function requestProjects(id: string):Action {
  return {
    type: actionTypes.REQUEST_PROJECTS,
    id
  }
}

export function receiveProjects(json: Object): Action {
  return {
    type: actionTypes.RECEIVE_PROJECTS,
    json,
  }
}

export function requestProjectsError(error: Object): Action {
  return {
    type: actionTypes.REQUEST_PROJECTS_ERROR,
    error,
  }
}

export function projectsNotFound(): Action {
    return {
        type: actionTypes.PROJECTS_NOT_FOUND
    }
}


export function fetchProjectsFromRegistry(id: string):Object{
  return (dispatch: Function)=>{
    dispatch(requestProjects(id))
    let url : string = "";
    return fetch(url)
    .then(response => {
        if (response.status >= 400) {
          if(response.status === 404){
            return dispatch(projectsNotFound());
          }
            return dispatch(requestProjectsError(response));
        } 
        return response.json();
    })
    .then((json) => dispatch(receiveProjects(json))
    )
  }
}


