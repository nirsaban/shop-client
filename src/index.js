import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
   <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");