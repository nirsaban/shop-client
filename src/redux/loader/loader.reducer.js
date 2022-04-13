import { LoaderActionTypes } from './loader.types';

const INITIAL_STATE = {
  showLoader: false
};

const LoaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoaderActionTypes.SHOW_LOADER:
      return {
        ...state,
        showLoader: !state.showLoader
      };
    default:
      return state;
  }
};
export default LoaderReducer;
