// Actions
export const types = {
  SET_USER_INFO: 'SET_USER_INFO'
}
const initialState = {
  uinfo: { a: 1, b: 2 }
}
// Reducer
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_USER_INFO:
      return state
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
  }
}
