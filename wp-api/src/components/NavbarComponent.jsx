import React, { useState } from 'react';
import { Link } from 'react-router-dom'
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
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function NavbarComponent() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' style={{backgroundColor: '#332D2D'}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' className='text-light'><img src='https://icon-library.com/images/press-icon-png/press-icon-png-15.jpg' alt='Logo' width={40}></img> NeWP</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <Link to="/">
              <MDBNavbarLink active aria-current='page' className='text-light'>
                Home
              </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <Link to="/blog">
              <MDBNavbarLink className='text-light'>Blog</MDBNavbarLink>
              </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <Link to="/users">
              <MDBNavbarLink className='text-light'>Utenti</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}