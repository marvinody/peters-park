/* global describe beforeEach it */
import { expect } from 'chai'
import { spy } from 'sinon'

// These test only check for your react-redux portions and see if
// the mapStateToProps and mapDispatchToProps are correct
// You should be able to reason what parts of the state each component needs
// but you can use this to guide you
import { mapStateToProps as AllCatsMapState, mapDispatchToProps as AllCatsMapDispatch } from '../../src/client/components/AllCats'

describe('React-Redux MapBlanks', () => {
  describe('AllCats', () => {
    describe('mapState', () => {
      it('should take cats from state', () => {
        const fakeState = {
          cats: ['fake', 'cat', 'data']
        }

        const mappedState = AllCatsMapState(fakeState)
        expect(mappedState.cats).to.equal(fakeState.cats)

      })
    })
    describe('mapDispatch', () => {
      it('should have a fetchCats property & should be a function', () => {
        const fakeDispatch = spy()

        const mappedDispatch = AllCatsMapDispatch(fakeDispatch)
        expect(mappedDispatch.fetchCats).to.not.be.an('undefined')
        expect(mappedDispatch.fetchCats).to.be.a('function')
      })

      it('should have a fetchCats property', () => {
        const fakeDispatch = spy()

        const mappedDispatch = AllCatsMapDispatch(fakeDispatch)
        mappedDispatch.fetchCats() // call the thing so we "load" the cats
        expect(fakeDispatch.calledOnce).to.equal(true)

      })
    })
  })
})
