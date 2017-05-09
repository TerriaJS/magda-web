// @flow 

const initialData = {
    isFetching: false,
    projects: {},
    error: undefined,
    notFound:  false
}


type ProjectsResult = {
  isFetching : boolean,
  projects: Object,
  error: any,
  notFound: boolean
}

type recordAction = {
  json: Object,
  error: boolean,
  type: boolean
}

const projects = (state: ProjectsResult = initialData, action: recordAction) => {
  switch (action.type) {
    case 'REQUEST_PROJECTS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_PROJECTS':
      return Object.assign({}, state, {
        isFetching: false,
        projects: action.json && action.json,
      })
    case 'REQUEST_PROJECTS_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'PROJECTS_NOT_FOUND':
      return Object.assign({}, state, {
        isFetching: false,
        notFound:  true
      })
    default:
      return state
  }
};
export default projects;
