import { call, put } from 'redux-saga/effects'
import useFetch from 'use-http'
import { types } from './user'
export function * getInfos () {
  // saga
  try {
    const { get } = useFetch('http://localhost:3000/')
    const data = yield call(get('/user/dict'))
    put({ type: types.SET_DICT_INFO, data })
  } catch (err) {
    // put({type:types.SET_DICT_INFO,err})
    console.error(err)
  }
}
