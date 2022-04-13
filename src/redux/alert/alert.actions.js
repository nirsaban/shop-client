import { AlertActionTypes } from './alert.types';

export const setShowAlert = alert => ({
  type: AlertActionTypes.SHOW_ALERT,
  payload: alert
});
export const setAlertMsg = msg => ({
  type: AlertActionTypes.SET_MESSAGE,
  payload: msg
});

