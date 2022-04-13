import { createSelector } from 'reselect';

const selectShowAlert = state => state.alert

export const selectAlert = createSelector(
  [selectShowAlert],
  alert => alert.showAlert
);
export const selectAlertMsg = createSelector(
  [selectShowAlert],
  message => message.message
);
