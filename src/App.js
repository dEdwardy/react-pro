import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Provider } from 'react-redux'
import state from './store'
import { Login } from './pages/login/Login'
import { Provider as HttpProvider } from 'use-http'
import { notification } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
function App () {
  const { store, persistor } = state
  const globalOptions = {
    interceptors: {
      request: ({ options }) => {
        if (localStorage.token) {
          options.headers = {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
        return options
      },
      response: ({ response: { data } }) => {
        console.error('xxxx')
        console.error(data)
        if (data.statusCode !== 200 || data.error || data.data.error) {
          notification.error({
            message: data.error || data.data.error
          })
          return Promise.reject(new Error(data.error || data.data.error))
        }
        return data
      }
    }
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HttpProvider options={globalOptions}>
          <Router>
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/*" component={Home}></Route>
            </Switch>
          </Router>
        </HttpProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
