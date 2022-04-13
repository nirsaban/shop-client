import { LoaderActionTypes } from './loader.types';

export const setShowLoader = loader => ({
  type: LoaderActionTypes.SHOW_LOADER,
  payload: loader
});

