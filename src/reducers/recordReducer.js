// @flow
import {parseDataset, parseDistribution} from '../helpers/record';

const initialData = {
    isFetching: false,
    dataset: {},
    distribution: {},
    error: undefined,
    notFound:  false
}


type RecordResult = {
  datasetIsFetching : boolean,
  distributionIsFetching: boolean,
  datasetFetchError: ?number,
  distributionFetchError: ?number,
  dataset: Object,
  distribution: Object,
  error: any,
}

type recordAction = {
  json: Object,
  error: boolean,
  type: boolean
}

const record = (state: RecordResult = initialData, action: recordAction) => {
  switch (action.type) {
    case 'REQUEST_DATASET':
      return Object.assign({}, state, {
        datasetIsFetching: true,
        datasetFetchError: null
      })
    case 'RECEIVE_DATASET':
      return Object.assign({}, state, {
        datasetIsFetching: false,
        dataset: action.json && parseDataset(action.json),
      })
    case 'REQUEST_DATASET_ERROR':
      return Object.assign({}, state, {
        datasetIsFetching: false,
        datasetFetchError: action.error,
      })
    case 'REQUEST_DISTRIBUTION':
      return Object.assign({}, state, {
        distributionIsFetching: true
      })
    case 'RECEIVE_DISTRIBUTION':
      return Object.assign({}, state, {
        distributionIsFetching: false,
        distribution: action.json && parseDistribution(action.json),
      })
    case 'REQUEST_DISTRIBUTION_ERROR':
      return Object.assign({}, state, {
        distributionIsFetching: false,
        distributionFetchError: action.error,
      })
    default:
      return state
  }
};
export default record;
