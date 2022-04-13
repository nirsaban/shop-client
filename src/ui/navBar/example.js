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
import { Form,Button ,Col,Container,Row,Card} from 'react-bootstrap';
const NavbarComponent = ({ routes, isLoggedIn, hidden, routesAdmin }) => {
    const [showBasic, setShowBasic] = useState(false);
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <LinkContainer to={"/"}>
                    <MDBNavbarBrand href='#'> MABRUK ALIK</MDBNavbarBrand>
                </LinkContainer>

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
                        {routes.map(route => {
                            if (Array.isArray(route)) {
                                let main = route.filter(x => x.main != null)[0]
                                return (
                                    <MDBNavbarItem>
                                        <MDBDropdown>
                                            <MDBDropdownToggle >
                                                {<i className={main.icon}>{isLoggedIn ? isLoggedIn.full_name.split(" ")[0] : main.main}</i>}
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                {
                                                    route.map(r => {
                                                        r = r.hasOwnProperty("switch") && isLoggedIn ? r.switch : r
                                                        if (!r.main)
                                                            return (
                                                                <LinkContainer to={r.path}>
                                                                    <MDBDropdownItem>{r.name} <i className={r.icon} ></i></MDBDropdownItem>
                                                                </LinkContainer>
                                                            )
                                                    })
                                                }
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavbarItem>
                                )
                            }
                            else {
                                return (
                                    <MDBNavbarItem>

                                        <LinkContainer to={route.path}>
                                            <MDBNavbarLink >{route.name} <i className={route.icon}></i></MDBNavbarLink>
                                        </LinkContainer>
                                    </MDBNavbarItem>
                                )
                            }
                        })}
                        {
                            routesAdmin ?
                                (
                                    <MDBNavbarItem>
                                        <MDBDropdown>
                                            <MDBDropdownToggle >Dashboard <i class="fas fa-tools">Dashboard</i></MDBDropdownToggle>
                                                 <MDBDropdownMenu>
                                                    {
                                                        routesAdmin.map(route => {
                                                            return (
                                                                <LinkContainer to={route.path}>
                                                                    <MDBDropdownItem.Item >{route.name} <i className={route.icon} ></i></MDBDropdownItem.Item>
                                                                </LinkContainer>
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

                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>Link</MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link'>
                                    Dropdown
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>Action</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>Another action</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>Something else here</MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                                Disabled
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <form className='d-flex input-group w-auto'>
                        <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                        <Button color='primary'>Search</Button>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavbarComponent