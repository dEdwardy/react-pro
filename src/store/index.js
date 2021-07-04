
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reducer from './user'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const reduers = combineReducers({
  user: reducer
})
const store = createStore(reduers, composeEnhancers(applyMiddleware()))

export default store
