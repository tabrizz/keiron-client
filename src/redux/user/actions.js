import types from "./types"
import axios from "axios"

const { SET_CURRENT_USER, SET_CURRENT_USER_LIST } = types

export const setCurrentUser = (user) => {
  return (dispatch) => {
    return axios.post("/login", user)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data.user
        })
      })
  }
}


export const setUserList = () => {
  return (dispatch) => {
    return axios.get("/users")
      .then(res => {
        return dispatch({
            type: SET_CURRENT_USER_LIST,
            payload: res.data.users
          })
      })
  }
}