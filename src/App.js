import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { Login } from './pages/login/Login'
import { hot } from 'react-hot-loader/root'
import { PersistGate } from 'redux-persist/integration/react'
function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route path="/" component={Home}></Route>
              <Route path="*" render={() => '404'}></Route>
            </Switch>
          </Router>
      </PersistGate>
    </Provider>
  )
}

const AppHot = process.env.NODE_ENV === 'development' ? hot(App) : App
export default AppHot
