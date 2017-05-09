// @flow 

const initialData = {
    isFetching: false,
    publishers: [],
    hitCount: 0,
    error: undefined,
    notFound:  false
}


type PublishersResult = {
  isFetching : boolean,
  publishers: Array<Object>,
  hitCount: number,
  error: any,
  notFound: boolean
}

type recordAction = {
  json: Object,
  error: boolean,
  type: boolean
}

const publisher = (state: PublishersResult = initialData, action: recordAction) => {
  switch (action.type) {
    case 'REQUEST_PUBLISHERS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_PUBLISHERS':
      return Object.assign({}, state, {
        isFetching: false,
        publishers: action.json && action.json.options,
        hitCount: action.json && action.json.hitCount,
      })
    case 'REQUEST_PUBLISHERS_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'PUBLISHERS_NOT_FOUND':
      return Object.assign({}, state, {
        isFetching: false,
        notFound:  true
      })
    default:
      return state
  }
};
export default publisher;
