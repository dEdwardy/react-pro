
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reducer from './user'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const reduers = combineReducers({
  user: reducer
})

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, reduers)
// const store = createStore(reduers, composeEnhancers(applyMiddleware()))

// export default store

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware()))
  const persistor = persistStore(store)
  return { store, persistor }
}
