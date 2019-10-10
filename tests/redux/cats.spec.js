/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import axios from 'axios'
import axiosMockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import thunking from 'redux-thunk'
import { spy } from 'sinon'

import catsReducer, { loadCats, fetchCats } from '../../src/client/store/cats'

// THIS IS THE DATA THAT WILL BE CONSISTENTLY THROUGH THIS TEST
const fakeCats = [
  { id: 1, name: 'Lola' },
  { id: 2, name: 'Peter' }
]


xdescribe('Redux - Cats', () => {

  describe('Initial state', () => {
    it('should have an empty array as the initial state', () => {
      const dummyAction = {} // just a blank obj for the action
      // we're interested in what you reducer returns with undefined given for state
      const reducedState = catsReducer(undefined, dummyAction)
      expect(reducedState).to.deep.equal([])
    })
  })

  describe('Action Creators', () => {
    describe('loadCats', () => {
      it('should have a type of "LOAD_CATS"', () => {
        const loadCatsAction = loadCats([])
        expect(loadCatsAction.type).to.be.equal('LOAD_CATS')
      })

      it('should set the .cats property to the passed in data', () => {
        // we're just giving it an array of strings because we don't care too much about what the
        const loadCatsAction = loadCats(['cat1', 'cat2'])
        expect(loadCatsAction.cats).to.deep.equal(['cat1', 'cat2'])

      })

    })
  })

  describe('Thunk Creators', () => {
    const mockStore = configureStore([thunking])

    let mockAxios
    let store
    beforeEach(() => {
      mockAxios = new axiosMockAdapter(axios)
      store = mockStore([])
    })

    afterEach(() => {
      mockAxios.restore()
    })

    describe('fetchCats', () => {
      it('should eventually call the dispatch function', async () => {
        // making sure you get something when you call the api for now
        // THIS IS IMPORTANT
        // MAKE SURE YOUR URL HAS A TRAILING SLASH ON YOUR API CALL
        // OR YOU'RE GONNA HAVE A BAD TIME
        mockAxios.onGet('/api/cats/').replyOnce(200, fakeCats)
        const dispatch = spy()
        // We're just acivating the fetch cats stuff
        // the line after is better
        await fetchCats()(dispatch)
        // you should always call dispatch in your thunks
        expect(dispatch.calledOnce).to.equal(true)
      })

      it('should dispatch loadCats with the correct data', async () => {
        mockAxios.onGet('/api/cats/').replyOnce(200, fakeCats)

        await store.dispatch(fetchCats())
        const actions = store.getActions()
        const expectedPayload = {
          type: 'LOAD_CATS',
          cats: fakeCats
        }
        expect(actions[0]).to.be.deep.equal(expectedPayload)

      })
    })
  })

  describe('Reducer', () => {
    it('should have a case for when state needs to load cats', () => {
      const prevState = []
      const action = {
        type: 'LOAD_CATS',
        cats: fakeCats,
      }
      const nextState = catsReducer(prevState, action)
      expect(nextState).to.be.deep.equal(fakeCats)
    })
  })
})
