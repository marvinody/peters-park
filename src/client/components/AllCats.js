import React from 'react'
import { connect } from 'react-redux'

// why are we exporting so much stuff you might ask?
// and I would say good question
// long story short, I need access to this stuff to test it
// so we export it
// by calling it disconnected (from the redux store), it's clear that
// this is not the correct import you want generally
// you want the default export
// don't worry about it too much
export const DisconnectedAllCats = props => {
  return (
    <span>
      YOUR STUFF HERE
  </span>
  )
}

// the mapBlankToProps don't have to be filled out with anything
// but use them to your advantage
export const mapStateToProps = (state) => {
  return {

  }
}

export const mapDispatchToProps = (dispatch) => {
  return {

  }
}

// don't touch this line
// but this is the component you probably want in most cases
// so if you're using DisconnectedAllCats somewhere else in your program
// you're gonna have a bad time
export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedAllCats)



