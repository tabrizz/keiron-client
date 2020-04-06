import types from "./types"
import axios from "axios"

const { SET_CURRENT_USER, SET_CURRENT_USER_LIST } = types

export const setCurrentUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios.post("/login", user)
      if (status === 200) {
        localStorage.setItem('token', data.token)
        dispatch({
          type: SET_CURRENT_USER,
          payload: data.user
        })
        history.push("/")
      }
    } catch (err) {
      console.log('Error login')
    }
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