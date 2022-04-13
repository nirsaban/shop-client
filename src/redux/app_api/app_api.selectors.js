import { createSelector } from 'reselect';

const selectAppApi = state => state.app_api;

export const selectAppApiData = createSelector(
  [selectAppApi],
  app_api => app_api.all_apps
  
);
