import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/results'
import * as types from '../constants/ActionTypes'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://example.com/')
      .get('/water')
      .reply(200, { body: { results: {} }})

    const expectedActions = [
      { type: types.REQUEST_RESULTS},
      { type: types.REQUEST_RESULTS, body: { results: {}  } }
    ]
    const store = mockStore({ results: {} })

    return store.dispatch(actions.fetchTodos())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
