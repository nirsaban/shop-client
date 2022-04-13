import axios from 'axios';
import { store } from '../redux/store';
import { setAlertMsg } from '../redux/alert/alert.actions';
import Cookies from 'universal-cookie';

let url = window.location.origin
if(url.includes("local")){
    url = "http://localhost:5000"
}
const baseURL = url

const instanceConfig = {
    baseURL: baseURL,
    headers: {
      'Content-type': 'application/json',
       Accept: 'application/json',
       withCredentials: true,
    },
};

const Axios = axios.create(instanceConfig);

Axios.interceptors.request.use(
    function (config) {
          const cookies = new Cookies()
          const token = cookies.get("token");
          config.headers['Authorization'] = `Nirsa11${token}` || ''; 
          config.headers.Accept = 'application/json';
         return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

Axios.interceptors.request.use(
  req => {
    store.dispatch(action());
    return req;
  },
  error => {
     console.log("Request  Error: ", error.message)
     store.dispatch(action());
     return Promise.reject(error)
  }
);

Axios.interceptors.response.use(
  response => {
  store.dispatch(action());
  console.log('Intercepting the response before sending it', response)
 
  if((response.status == 200 ||response.status == 201)  && response.config.method != "get"){
    store.dispatch(action_alertMsg(response.data.msg));
    store.dispatch(action_alert());

  }
  return response
},
error => {
  store.dispatch(action());
  console.log("Response  Error: ", error);
  return Promise.reject(error)
})
function action() {
    return {
      type: 'SHOW_LOADER',
    }
  }
function action_alert(){
  return {
    type: 'SHOW_ALERT',
  }
}
function action_alertMsg(msg){
  return {
    type: 'SET_MESSAGE',
    payload:msg
  }

}

  export default Axios;


