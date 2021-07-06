// Actions
export const types = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_DICT_INFO: 'SET_DICT_INFO'
}
const initialState = {
  uinfo: { a: 1, b: 2 },
  dict: {}
}
// Reducer
export default async function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        uinfo: action.data
      }
    case types.SET_DICT_INFO:
      return {
        ...state,
        dict: action.data
      }
    default:
      return state
  }
}
// Action Creators

export const actions = {
  setUserInfo (data) {
    return {
      type: types.SET_USER_INFO,
      data
    }
  },
  setDictInfo (data) {
    return {
      type: types.SET_DICT_INFO,
      data
    }
  }
}
