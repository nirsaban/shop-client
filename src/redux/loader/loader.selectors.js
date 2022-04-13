import { createSelector } from 'reselect';

const selectShowLoader = state => state.loader

export const selectLoader = createSelector(
  [selectShowLoader],
  loader => loader.showLoader
);
