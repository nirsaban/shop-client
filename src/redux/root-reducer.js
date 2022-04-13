import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import LoaderReducer from './loader/loader.reducer';
import AlertReducer from './alert/alert.reducer';
// import cartReducer from './cart/cart.reducer';
// import directoryReducer from './directory/directory.reducer';
// import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  loader:LoaderReducer,
  cart:cartReducer,
  alert:AlertReducer
});

export default persistReducer(persistConfig, rootReducer);