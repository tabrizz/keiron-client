import { createSelector } from 'reselect'

const selectTickets = state => { 
  return state.ticket
}

export const selectTicketsList = createSelector(
  [selectTickets],
  ticket => ticket.tickets
)

export const selectTicketsListByUser = createSelector(
  [selectTickets],
  ticket => ticket.ticketsByUser
)