import { AppApiActionTypes } from './app_api.types';

export const setAppApiData = app_api => ({
  type: AppApiActionTypes.SET_APP_API_DATA,
  payload: app_api
});
export const update_app_api = app_api => ({
  type: AppApiActionTypes.UPDATE_APP_API,
  payload: app_api
});
export const edit_app_api = app_api => ({
  type: AppApiActionTypes.EDIT_APP_API,
  payload: app_api
});

