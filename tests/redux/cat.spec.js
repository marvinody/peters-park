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

import catReducer, { loadCat, fetchCat } from '../../src/client/store/cat'

// THIS IS THE DATA THAT WILL BE CONSISTENTLY THROUGH THIS TEST
const fakeCat = {
  id: 1,
  name: 'Lola',
  friends: [
    { id: 2, name: 'Peter' },
    { id: 3, name: 'Charlie' },
  ],
  favoriteToys: [
    { id: 1, name: 'laser', rating: 5 }
  ]
}


describe('Redux - Cat', () => {

  describe('Initial state', () => {
    it('should have an empty object as the initial state', () => {
      const dummyAction = {} // just a blank obj for the action
      // we're interested in what you reducer returns with undefined given for state
      const reducedState = catReducer(undefined, dummyAction)
      expect(reducedState).to.deep.equal({})
    })
  })

  describe('Action Creators', () => {
    describe('loadCat', () => {
      it('should have a type of "LOAD_CAT"', () => {
        const loadCatAction = loadCat({}) // just want to see the action returned
        expect(loadCatAction.type).to.be.equal('LOAD_CAT')
      })

      it('should set the .cat property to the passed in data', () => {
        // we're just giving it an array of strings because we don't care too much about what the
        const loadCatAction = loadCat(fakeCat)
        expect(loadCatAction.cat).to.deep.equal(fakeCat)

      })

    })
  })

  describe('Thunk Creators', () => {
    const mockStore = configureStore([thunking])

    let mockAxios
    let store
    beforeEach(() => {
      mockAxios = new axiosMockAdapter(axios)
      store = mockStore({})
    })

    afterEach(() => {
      mockAxios.restore()
    })

    describe('fetchCat', () => {
      it('should eventually call the dispatch function', async () => {
        // making sure you get something when you call the api for now
        // THIS IS IMPORTANT
        // MAKE SURE YOUR URL HAS A TRAILING SLASH ON YOUR API CALL
        // OR YOU'RE GONNA HAVE A BAD TIME
        // console.log the URL you're giving axios if having issues and make sure they match
        mockAxios.onGet('/api/cats/1/').replyOnce(200, fakeCat)
        const dispatch = spy()
        // We're just acivating the fetch cats stuff
        // the line after is better
        await fetchCat(fakeCat.id)(dispatch)
        // you should always call dispatch in your thunks
        expect(dispatch.calledOnce).to.equal(true)
      })

      it('should dispatch loadCat with the correct data', async () => {
        mockAxios.onGet('/api/cats/1/').replyOnce(200, fakeCat)

        await store.dispatch(fetchCat(fakeCat.id))
        const actions = store.getActions()
        const expectedPayload = {
          type: 'LOAD_CAT',
          cat: fakeCat
        }
        expect(actions[0]).to.be.deep.equal(expectedPayload)

      })
    })
  })

  describe('Reducer', () => {
    it('should have a case for when state needs to load cats', () => {
      const prevState = {}
      const action = {
        type: 'LOAD_CAT',
        cat: fakeCat,
      }
      const nextState = catReducer(prevState, action)
      expect(nextState).to.be.deep.equal(fakeCat)
    })
  })
})
