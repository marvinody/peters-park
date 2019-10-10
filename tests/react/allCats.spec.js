/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// This is the part you update
import { DisconnectedAllCats } from '../../src/client/components/AllCats'
import CatCard from '../../src/client/components/CatCard'

// some setup
const adapter = new Adapter()
enzyme.configure({ adapter })

describe('React - AllCats', () => {
  let catsWrapper

  const cats = [
    { id: 9001, name: 'Lola' },
    { id: 9002, name: 'Peter' }
  ]

  beforeEach(() => {
    catsWrapper = shallow(<DisconnectedAllCats cats={cats} />)
  })

  it(`shows "Peter's Park" in an h1 somewhere`, () => {
    expect(catsWrapper.find('h1')).have.lengthOf(1)
    expect(catsWrapper.find('h1').text()).to.be.equal("Peter's Park")
  })

  it('renders CatCard components for each element in cats prop', () => {
    expect(catsWrapper.find(CatCard).length).to.equal(cats.length)
  })

  it('passes some props to the CatCard components', () => {
    const firstCatCard = catsWrapper.find(CatCard).get(0)

    expect(+firstCatCard.key).to.equal(cats[0].id)
    expect(firstCatCard.props.id).to.equal(cats[0].id)
    expect(firstCatCard.props.name).to.equal(cats[0].name)
  })


})
