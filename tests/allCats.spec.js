/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// This is the part you update
import { DisconnectedAllCats } from '../src/client/components/AllCats'

// some setup
const adapter = new Adapter()
enzyme.configure({ adapter })

describe('AllCats', () => {
  let catsWrapper

  const cats = [

  ]

  beforeEach(() => {
    catsWrapper = shallow(<DisconnectedAllCats />)
  })

  it('tests for something', () => {
    expect(catsWrapper.find('an element').text()).to.be.equal('some text')
  })
})
