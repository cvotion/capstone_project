import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Image from '../images/SafeSeats-1.png'


    
const NavLoggedIn = () => {

  const [showBasic, setShowBasic] = useState(false);

  return (

 
<>   
  <MDBNavbar expand='lg' light bgColor='white' className='font-family-class'>
    <MDBContainer fluid id="logo">
      <MDBNavbarToggler
        onClick={() => setShowBasic(!showBasic)}
        aria-controls='navbarExample01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <FontAwesomeIcon icon={faBars} />
      </MDBNavbarToggler>

      <MDBNavbarItem active >
        <Link to='./'>
        <img src={Image} height="70px" width='70px'></img>
        </Link>
      </MDBNavbarItem>
      
      <MDBCollapse navbar show={showBasic}>
        <MDBNavbarNav right className='mb-2 mb-lg-0 d-flex'>
          
          <div className='d-flex m-3' id='nav-items'>

            <MDBNavbarItem active>
              <Link aria-current='page' to='./nearby' className='nav-link'>
                Nearby
              </Link>
            </MDBNavbarItem>
            {/* <MDBNavbarItem>
              <Link to='./login' className='nav-link'>Login</Link>
            </MDBNavbarItem> */}
            <MDBNavbarItem>
            <Link to='./searchLocation' className='nav-link'>Search Location</Link>
            </MDBNavbarItem>
            {/* <MDBNavbarItem>
            <Link to='./profilepage' className='nav-link'>Profile Page</Link>
            </MDBNavbarItem> */}
            <MDBNavbarItem>
              <Link to='./favorites' className='nav-link'>Favorites</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='./signout' className='nav-link'>Sign Out</Link>
            </MDBNavbarItem>

          </div>

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
</>


  );
}

export default NavLoggedIn