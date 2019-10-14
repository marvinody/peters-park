/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// This is the part you update
import { DisconnectedSingleCat } from '../../src/client/components/SingleCat'
import CatCard from '../../src/client/components/CatCard'

// some setup
const adapter = new Adapter()
enzyme.configure({ adapter })

xdescribe('React - SingleCat', () => {
  let catWrapper

  const cat = {
    id: 9001,
    name: "Peter",
    imageUrl: 'peters image url',
    favoriteToys: [
      { name: 'laser', likeness: 5 }
    ],
    friends: [
      { id: 9002, name: 'Lola', imageUrl: '' },
      { id: 9003, name: 'Charlie', imageUrl: '' },
      { id: 9004, name: 'Guapo', imageUrl: '' },
    ]

  }

  beforeEach(() => {
    catWrapper = shallow(<DisconnectedSingleCat {...cat} />)
  })

  it(`shows the cats name in an h2 somewhere`, () => {
    expect(catWrapper.find('h2')).have.lengthOf(1)
    expect(catWrapper.find('h2').text()).to.be.equal(cat.name)
  })

  it('has an img tag with src set to imageUrl', () => {
    expect(catWrapper.find('img').length).to.be.greaterThan(0)
    expect(catWrapper.find('img').get(0).props.src).to.equal(cat.imageUrl)

  })

  it('has a list of favorite toys with class of "toys"', () => {
    const toyList = catWrapper.find('ul.toys')
    // this is checking to make sure that it exists
    // not that it only has 1 child
    expect(toyList).to.have.lengthOf(1)

    // now we look at children's length
    const toyListItems = toyList.find('li')
    expect(toyListItems).to.have.lengthOf(cat.favoriteToys.length)

  })

  describe('friends block', () => {

    it('should have a div with the class friends', () => {
      const friendsWrapper = catWrapper.find('.friends').shallow()
      // this is checking to make sure that it exists
      expect(friendsWrapper.exists()).to.equal(true)
    })

    it('should have an h3 header with the correct title', () => {
      expect(catWrapper.exists('h3')).to.equal(true)
      expect(catWrapper.find('h3').text()).to.be.equal('Friends')
    })

    it('should render a CatCard for each friend', () => {
      const catCardsWrapper = catWrapper.find(CatCard)
      expect(catCardsWrapper).to.have.lengthOf(cat.friends.length)
      const allHaveKeys = catCardsWrapper.everyWhere((catCard, idx) => {
        return cat.friends[idx].id === +catCard.key()
      })

      expect(allHaveKeys, 'Each CatCard should have a corresponding ID').to.equal(true)
    })

  })


})
