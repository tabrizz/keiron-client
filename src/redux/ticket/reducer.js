import types from "./types"

const { LIST_TICKETS,LIST_TICKETS_BY_USER } = types
const INITIAL_STATE = {
  tickets: [],
  ticketsByUser: []
}

const ticketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_TICKETS:
      return {
        ...state,
        tickets: action.payload
      }
    case LIST_TICKETS_BY_USER:
      return {
        ...state,
        ticketsByUser: action.payload
    }  
    default:
      return state  
  }
}

export default ticketReducer