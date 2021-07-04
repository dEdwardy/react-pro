import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Provider } from 'react-redux'
import store from './store'
import { Login } from './pages/login/Login'
function App () {
  return (
    <Provider store={store}>
      <Router>
         <Switch>
              <Route path="/login" component={Login}>
              </Route>
              <Route path="/*" component={ Home}>
              </Route>
         </Switch>
      </Router>
    </Provider>

  )
}

export default App
