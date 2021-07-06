import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { Login } from './pages/login/Login'
import { hot } from 'react-hot-loader/root'
import { Provider as HttpProvider } from 'use-http'
import { notification } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
function App () {
  const globalOptions = {
    interceptors: {
      request: ({ options }) => {
        const token = localStorage.getItem('token')
        if (token) {
          options.headers = {
            Authorization: `Bearer ${token}`
          }
        }
        return options
      },
      response: ({ response: { data } }) => {
        if (data.statusCode !== 200 || data.error || data.data.error) {
          console.error(data.error || data.data.error)
          notification.error({
            message: data.error || data.data.error,
            duration: 1
          })
          return Promise.reject(new Error(data.error || data.data.error))
        }
        console.error('xxx')
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
              <Route exact path="/login" component={Login}></Route>
              <Route path="/" component={Home}></Route>
              <Route path="*" render={() => '404'}></Route>
            </Switch>
          </Router>
        </HttpProvider>
      </PersistGate>
    </Provider>
  )
}

const AppHot = process.env.NODE_ENV === 'development' ? hot(App) : App
export default AppHot
