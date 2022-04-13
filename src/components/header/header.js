import NavbarComponent from "../../ui/navBar/navBar";
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LinkContainer } from 'react-router-bootstrap'
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import routes from '../../config/routes.json';
import routesAdmin from '../../config/routesAdmin.json';
import {deleteCookie} from '../../helpers/functionUtils'
const Header = ({currentUser,hidden,setCurrentUser}) => {

    const handleLogout = () => {
        deleteCookie("token");
        setCurrentUser(null)
    }
    return (
        <NavbarComponent handleLogout = {handleLogout}  routes={routes}  isLoggedIn = {currentUser} hidden = {hidden} routesAdmin = { currentUser?.permissions == 1 ? routesAdmin: null}  />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
