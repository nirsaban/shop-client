
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
import { MDBInput, MDBCol } from "mdbreact";
import { LinkContainer } from 'react-router-bootstrap'
const SearchTool = ({handleSearch}) => {

    return (

        <MDBNavbar expand='sm' light bgColor='light' className='m-5 col-md-3 col-sm-2'>
            <MDBContainer fluid className='d-flex justify-content-between'>
                <div>
                    <LinkContainer to={"/"}>
                            <MDBInput label="Search" icon="search"  onChange={handleSearch}/>
                    </LinkContainer>
                </div>

            </MDBContainer>

        </MDBNavbar>

    )


}

export default SearchTool