import types from "./types"

const { SET_CURRENT_USER, SET_CURRENT_USER_LIST } = types
const INITIAL_STATE = {
  user: null,
  userList: []
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_CURRENT_USER_LIST:
      return {
        ...state,
        userList: action.payload
    }  
    default:
      return state  
  }
}

export default userReducer