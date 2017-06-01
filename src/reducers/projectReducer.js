// @flow
import {parseProject} from '../helpers/api';
import type {Project, ProjectAction } from '../types';


const initialData = {
    isFetching: false,
    projects: [],
    error: null,
    notFound:  false,
    hitCount: 0
}


type ProjectsResult = {
  isFetching : boolean,
  projects: Array<Project>,
  error: ?number,
  hitCount: number
}


const projects = (state: ProjectsResult = initialData, action: projectAction) => {
  switch (action.type) {
    case 'REQUEST_PROJECTS':
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      })
    case 'RECEIVE_PROJECTS':
      return Object.assign({}, state, {
        isFetching: false,
        projects: action.json && action.json.records && action.json.records.map(r=>parseProject(r)),
        hitCount: action.json.totalCount
      })
    case 'REQUEST_PROJECTS_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'CREATE_PROJECT':
    	return Object.assign({}, state, {
        isFetching: false,
        error: null,
      })
    case 'CREATE_PROJECT_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        project: action.newProject
      })
    case 'CREATE_PROJECT_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'VALIDATE_PROJECT_FIELDS':
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      })
    case 'VALIDATE_PROJECT_FIELDS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        fieldErrors: action.fieldErrors
      })
    default:
      return state
  }
};
export default projects;
