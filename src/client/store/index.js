// basic redux imports
import { applyMiddleware, combineReducers, createStore } from 'redux'
// next 2 are logging stuff for us to use and see
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
// WE THUNKING NOW
import thunkMiddleware from 'redux-thunk'
import cat from './cat'
// and finally, we get our actual stores here
import cats from './cats'

const reducer = combineReducers({
  cats,
  cat,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './cats'
export * from './cat'

