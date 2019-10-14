/* global describe beforeEach it */
import { expect } from 'chai'
import { spy } from 'sinon'

// These test only check for your react-redux portions and see if
// the mapStateToProps and mapDispatchToProps are correct
// You should be able to reason what parts of the state each component needs
// but you can use this to guide you
import { mapStateToProps as AllCatsMapState, mapDispatchToProps as AllCatsMapDispatch } from '../../src/client/components/AllCats'
import { mapStateToProps as SingleCatMapState, mapDispatchToProps as SingleCatMapDispatch } from '../../src/client/components/SingleCat'

describe('React-Redux MapBlanks', () => {
  xdescribe('AllCats', () => {
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
      it('should have a goGetCats property & should be a function', () => {
        const fakeDispatch = spy()

        const mappedDispatch = AllCatsMapDispatch(fakeDispatch)
        expect(mappedDispatch.goGetCats).to.not.be.an('undefined')
        expect(mappedDispatch.goGetCats).to.be.a('function')
      })

      it('should call the passed-in dispatch function when invoked', () => {
        const fakeDispatch = spy()

        const mappedDispatch = AllCatsMapDispatch(fakeDispatch)
        mappedDispatch.goGetCats() // call the thing so we "load" the cats
        expect(fakeDispatch.calledOnce).to.equal(true)

      })
    })
  })

  xdescribe('SingleCats', () => {
    describe('mapState', () => {
      it('should SPREAD the state\'s .cat', () => {
        const fakeState = {
          cat: {
            id: 9001,
            name: 'thundercat',
            stuff: {
              that: {
                you: ['better', {
                  be: 'spreading'
                }]
              }
            },
            or: "you're",
            gonna: 'have a',
            bad: 'time'
          }
        }

        const mappedState = SingleCatMapState(fakeState)
        expect(mappedState).to.deep.equal(fakeState.cat)

      })
    })

    describe('mapDispatch', () => {
      it('should have a goGetCat property & should be a function', () => {
        const fakeDispatch = spy();

        const mappedDispatch = SingleCatMapDispatch(fakeDispatch)
        expect(mappedDispatch.goGetCat).to.not.be.an('undefined')
        expect(mappedDispatch.goGetCat).to.be.a('function')
      })

      it('should call the passed-in dispatch function when invoked', () => {
        const fakeDispatch = spy()

        const mappedDispatch = SingleCatMapDispatch(fakeDispatch)
        mappedDispatch.goGetCat()
        expect(fakeDispatch.calledOnce).to.equal(true)
      })
    })
  })
})
