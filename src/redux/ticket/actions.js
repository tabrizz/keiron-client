import types from "./types"
import axios from "axios"

const { LIST_TICKETS,LIST_TICKETS_BY_USER } = types

export const createTicket = ({ description, selectedUser }) => {
  return (dispatch) => {
    return axios.post("/tickets", { description, user_id: +selectedUser })
      .then(res => {
        dispatch(listTickets())
        return res.status
      })
  }
}

export const updateTicket = (ticket) => {
  return (dispatch) => {
    return axios.put(`/tickets/${ticket.id}`, { taken: 1 })
      .then(res => {
        dispatch(listTicketsByUser(ticket.user_id))
        return res.status
      })
  }
}

export const listTickets = () => {
  return (dispatch) => {
    return axios.get("/tickets")
      .then(res => {
        return dispatch({
            type: LIST_TICKETS,
            payload: res.data.tickets
          })
      })
  }
}

export const listTicketsByUser = (userId) => {
  return (dispatch) => {
    return axios.get(`/tickets/user/${userId}`)
      .then(res => {
        return dispatch({
            type: LIST_TICKETS_BY_USER,
            payload: res.data.tickets
          })
      })
  }
}
