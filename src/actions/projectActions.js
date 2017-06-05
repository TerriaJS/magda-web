// @flow

import fetch from 'isomorphic-fetch'
import {config} from '../config'
import {actionTypes} from '../constants/ActionTypes';
import {validateProjectName, validateProjectDescription} from '../helpers/validateInput';
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


export function requestProject():ProjectAction {
  return {
    type: actionTypes.REQUEST_PROJECT,
  }
}

export function receiveProject(json: Object): ProjectAction {
  return {
    type: actionTypes.RECEIVE_PROJECT,
    json,
  }
}

export function requestProjectError(error: number): ProjectAction {
  return {
    type: actionTypes.REQUEST_PROJECT_ERROR,
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

export function createProject(newProject: Project): ProjectAction  {
  return {
    type: actionTypes.CREATE_PROJECT,
    newProject
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
    console.log(props);
    const url = config.registryUrl;
    return fetch(config.registryUrl,
    {
      method: 'POST',
      body: JSON.stringify(props),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }
      return dispatch(createProjectFailure(response.status))
    })
    .then((result: Project )=> {
      if(result.error){
        return false;
      }
      return dispatch(createProjectSuccess(result))
    });

  }
}



export function validateFields(props: Project){
  return (dispatch: Dispatch) =>{
    dispatch(validateProjectFields(props));
    const nameError = validateProjectName(props.get('name'));
    const descriptionError = validateProjectDescription(props.getIn(['aspects', 'project', 'description']));
    if( !nameError && !descriptionError){
      dispatch(postNewProject(props.toJS()));
    } else {
      dispatch(validateProjectFieldsFailure(
        Object.assign({}, props, {
          name: nameError,
          description: descriptionError
        })
      ))
    }
  }
}


export function fetchProjectsFromRegistry():Object{
  return (dispatch: Dispatch)=>{
    dispatch(requestProjects())
    let url : string = config.registryUrl + "?aspect=project";
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


export function fetchProjectFromRegistry(projectId):Object{
  return (dispatch: Dispatch)=>{
    dispatch(requestProject())
    let url : string = config.registryUrl + "/" + projectId + "?aspect=project";
    return fetch(url)
    .then(response => {
        if (response.status >= 400) {
            return dispatch(requestProjectError(response.status));
        }
        return response.json();
    })
    .then((json: Object) => dispatch(receiveProject(json))
    )
  }
}


export function fetchProjectIfNeeded(projectId: string){
  return (dispatch: Dispatch, getState: getState)=>{
    if(!getState().project.isFetching){
          return dispatch(fetchProjectFromRegistry(projectId))
      } else{
          return Promise.resolve();
      }
  }
}
