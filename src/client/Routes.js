import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AllCats from './components/AllCats'
import SingleCat from './components/SingleCat'

const Router = (props) => {
  return (
    <div>

      {/* Put all your routes here. You may need to import a component */}
      <Route exact path='/' component={AllCats} />
      <Route exact path="/cats" component={AllCats} />
      <Route exact path="/cats/:catId" component={SingleCat} />

    </div>
  )
}

// no touchy
export default withRouter(Router)
