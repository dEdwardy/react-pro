import { call, put, takeEvery, all } from 'redux-saga/effects'
import { actions, types } from './user'
import { getDict } from '@/api'
// logic saga
export function * fetchDict () {
  // saga
  try {
    const data = yield call(getDict)
    yield put(actions.setDictInfo(data))
  } catch (err) {
    // put({type:types.SET_DICT_INFO,err})
    console.error(err)
  }
}
// eslint-disable-next-line no-unused-vars
// watch saga
function * watchFetchDict () {
  yield takeEvery(types.FETCH_DICT, fetchDict)
}
// root saga
function * rootSaga () {
  // 启动 watchFetchDict
  yield all([watchFetchDict()])
}
export default rootSaga
