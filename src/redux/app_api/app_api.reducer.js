import { update_app_api,edit_app_api } from './utils';
import { AppApiActionTypes } from './app_api.types';

const INITIAL_STATE = {
  all_apps: null
};

const AppApiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case AppApiActionTypes.SET_APP_API_DATA:
      return {
        ...state,
        all_apps: action.payload
      };
    case AppApiActionTypes.UPDATE_APP_API:
      return {
        ...state,
        all_apps: update_app_api(state.all_apps,action.payload)
      };
    case AppApiActionTypes.EDIT_APP_API:
     
      return {
        ...state,
        all_apps: edit_app_api(state.all_apps,action.payload)
      };
    default:
      return state;
  }
};
export default AppApiReducer;
