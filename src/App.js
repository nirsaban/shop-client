import React,{useEffect,useRef} from 'react';
import {
  BrowserRouter,
  Routes, // Just Use Routes instead of "Switch"
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors'
import {selectLoader} from './redux/loader/loader.selectors';
import {selectAlert} from './redux/alert/alert.selectors';
import {selectAlertMsg} from './redux/alert/alert.selectors';
import {selectAppApiData} from './redux/app_api/app_api.selectors'
import {setShowAlert} from './redux/alert/alert.actions'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Loader from './components/loader/loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login.page'
import Register from './pages/register.page';
import { Switch } from 'react-router-dom';
import Category from './pages/dashboard/category'
import Product from './pages/dashboard/product'
import Package from './pages/dashboard/package';
import AboutUs from './pages/dashboard/about';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import ProtectedRoutePermissions from './components/protected-route/ProtectedRoutePermissions';
import Home from './pages/home.page'
import Header  from './components/header/header';
import Checkout from './pages/checkout/checkout.component';
import FooterPage from './components/footer/footer';
import AlertComp from  './components/alert/alert';
import ViewProduct from './components/viewProduct/viewProduct';
const publicRoutes = [
  { path: '/login', component: <Login/> },
  { path: '/', component: <Home /> },
  { path: '/register', component: <Register />},
  {path:"/view-product",component: <ViewProduct  />}
];
const adminRoutes = [
  { path: '/dashboard/category', component: <Category /> },
  { path: '/dashboard/product', component: <Product /> },
  { path: '/dashboard/package', component: <Package /> },
  { path: '/dashboard/About', component: <AboutUs /> }
];
const protectedRoutes = [
 
  { path: '/checkout', component: <Checkout /> },
];

const App = ({loader,currentUser,alert,setShowAlert,alertMessage}) => {
const childRef = useRef();

useEffect(() => {
  
  if(alert){
    childRef.current.notify("tc",alertMessage,"success")
    setTimeout(() => {
      setShowAlert(false)
    },3000)
  }
}, [alert]);
return (
  <div className='App ' >
    <Header />
    <Switch>
      {publicRoutes.map(route => {
        return (
          <Route key={route.path} path={route.path} exact>
            {route.component}
          </Route>
        );
      })}
      {protectedRoutes.map( route => {
        return (
          <ProtectedRoute
            key={route.path}
            exact
            component={route.component}
            path={route.path}
          />
        );
      })}
      {currentUser ?
      adminRoutes.map(route => {
        return (
          <ProtectedRoutePermissions
            key={route.path}
            exact
            component={route.component}
            path={route.path}
            permissions = {currentUser.permissions}
          />
        );
      })
     :null
    }
   </Switch>
  {
    loader ?
    <Loader/>
    :
    null    
  }
  <FooterPage/>
  <AlertComp ref={childRef}/>
</div>
)


}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  loader:selectLoader,
  alert :selectAlert,
  alertMessage:selectAlertMsg
});
const mapDispatchToProps = dispatch => ({
  setShowAlert: alert => dispatch(setShowAlert(alert))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



