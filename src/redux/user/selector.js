import { createSelector } from 'reselect'

const selectUser = state => { 
  return state.user
}

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.user
)

export const selectUserList = createSelector(
  [selectUser],
  user => user.userList
)