import { AlertActionTypes } from './alert.types';

const INITIAL_STATE = {
  showAlert: false
};

const AlertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AlertActionTypes.SHOW_ALERT:
      return {
        ...state,
        showAlert: !state.showAlert
      };
      case AlertActionTypes.SET_MESSAGE :{
        return {
          ...state,
          message:action.payload
        };
      }
    default:
      return state;
  }
};
export default AlertReducer;
