import React, { useState } from 'react';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { LinkContainer } from 'react-router-bootstrap'

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { Link, animateScroll as scroll } from "react-scroll";
const NavbarComponent = ({ routes, isLoggedIn, hidden, routesAdmin, handleLogout }) => {
    const [showBasic, setShowBasic] = useState(false);
    return (
        <MDBNavbar expand='lg' dark bgColor='dark' >
            <MDBContainer fluid className='d-flex justify-content-between'>
                <div>
                    <LinkContainer to={"/"}>
                        <MDBNavbarBrand href='#'> MABRUK ALIK</MDBNavbarBrand>
                    </LinkContainer>
                </div>
                <div>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            {routes.map((route, index) => {
                                if (Array.isArray(route)) {
                                    let main = route.filter(x => x.main != null)[0]
                                    return (
                                        <MDBNavbarItem key={index}>
                                            <MDBDropdown >
                                                <MDBDropdownToggle tag='a' className='nav-link'>
                                                    {<i className={main.icon}>{isLoggedIn ? isLoggedIn.full_name.split(" ")[0] : main.main}</i>}
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    {
                                                        route.map((r, index) => {
                                                            r = r.hasOwnProperty("switch") && isLoggedIn ? r.switch : r
                                                            if (!r.main) {
                                                                if (r.name == "Logout") {
                                                                    return (
                                                                        <MDBDropdownItem key={index}>
                                                                            <MDBDropdownLink onClick={handleLogout} >{r.name} <i className={r.icon} ></i></MDBDropdownLink>
                                                                        </MDBDropdownItem>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <MDBDropdownItem key={index}>
                                                                            <Link
                                                                                to={r.name}
                                                                                spy={true}
                                                                                smooth={true}
                                                                                offset={-70}
                                                                                duration={500}
                                                                            >
                                                                                <LinkContainer to={r.path}>
                                                                                    <MDBDropdownLink >{r.name} <i className={r.icon} ></i></MDBDropdownLink>
                                                                                </LinkContainer>
                                                                            </Link>
                                                                        </MDBDropdownItem>
                                                                    )
                                                                }

                                                            }

                                                        })
                                                    }
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavbarItem>
                                    )
                                }
                                else {
                                    return (
                                        <MDBNavbarItem key={index}>
                                            <Link
                                                to={route.name}
                                                spy={true}
                                                smooth={true}
                                                offset={-70}
                                                duration={500}
                                            >
                                                <LinkContainer to={route.path}>
                                                    <MDBNavbarLink >{route.name} <i className={route.icon}></i></MDBNavbarLink>
                                                </LinkContainer>
                                            </Link>
                                        </MDBNavbarItem>
                                    )
                                }
                            })}
                            {
                                routesAdmin ?
                                    (
                                        <MDBNavbarItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle tag='a' className='nav-link'>Dashboard </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    {
                                                        routesAdmin.map((route, index) => {
                                                            return (

                                                                <MDBDropdownItem key={index}>
                                                                    <LinkContainer to={route.path}>
                                                                        <MDBDropdownLink>{route.name} <i className={route.icon} ></i></MDBDropdownLink>
                                                                    </LinkContainer>
                                                                </MDBDropdownItem>

                                                            )
                                                        })
                                                    }
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavbarItem>
                                    )
                                    : null
                            }
                            <CartIcon />
                            {hidden ? null : <CartDropdown />}

                        </MDBNavbarNav>
                    </MDBCollapse>
                </div>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavbarComponent