// @flow

import fetch from 'isomorphic-fetch'
import {config} from '../config'
import {actionTypes} from '../constants/ActionTypes';
import type { ProjectAction, Project } from '../types';

type Dispatch = ()=> Function
type getState = () => {
  project: {
    isFetching: boolean
  }
}


export function requestProjects():ProjectAction {
  return {
    type: actionTypes.REQUEST_PROJECTS,
  }
}

export function receiveProjects(json: Object): ProjectAction {
  return {
    type: actionTypes.RECEIVE_PROJECTS,
    json,
  }
}

export function requestProjectsError(error: number): ProjectAction {
  return {
    type: actionTypes.REQUEST_PROJECTS_ERROR,
    error,
  }
}

export function validateProjectFields(props: Project): ProjectAction {
  return {
    type: actionTypes.VALIDATE_PROJECT_FIELDS,
  };
}

export function validateProjectFieldsFailure(fieldErrors: Project): ProjectAction {
  return {
    type: actionTypes.VALIDATE_PROJECT_FIELDS_FAILURE,
    fieldErrors
  };
}

export function resetProjectFields(): ProjectAction  {
  return {
    type: actionTypes.RESET_PROJECT_FIELDS
  }
};

export function createProject(props: Project): ProjectAction  {
  return {
    type: actionTypes.CREATE_PROJECT,
    props
  };
}

export function createProjectSuccess(newProject: Project): ProjectAction  {
  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    newProject
  };
}

export function createProjectFailure(error: number): ProjectAction {
  return {
    type: actionTypes.CREATE_PROJECT_FAILURE,
    error
  };
}


export function postNewProject(props: Project){
  return (dispatch: Dispatch) => {
    dispatch(createProject(props));
    const url = config.registryUrl;
    return fetch(config.registryUrl,
    {
      method: 'POST',
      body: props,
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }
      return dispatch(createProjectFailure(response.status))
    })
    .then((result: Project )=> {
      dispatch(createProjectSuccess(result))
    });

  }
}


export function validateFields(props: Project){
  return (dispatch: Dispatch) =>{
    debugger
    dispatch(validateProjectFields(props));
    if(true){
      postNewProject(props)
    } else {
      dispatch(validateProjectFieldsFailure({

      }))
    }
  }
}


export function fetchProjectsFromRegistry():Object{
  return (dispatch: Dispatch)=>{
    dispatch(requestProjects())
    let url : string = config.registryUrl + "?aspect=dcat-dataset-strings";
    return fetch(url)
    .then(response => {
        if (response.status >= 400) {
            return dispatch(requestProjectsError(response.status));
        }
        return response.json();
    })
    .then((json: Object) => dispatch(receiveProjects(json))
    )
  }
}


export function fetchProjectsIfNeeded(){
  return (dispatch: Dispatch, getState: getState)=>{
    if(!getState().project.isFetching){
          return dispatch(fetchProjectsFromRegistry())
      } else{
          return Promise.resolve();
      }
  }
}
