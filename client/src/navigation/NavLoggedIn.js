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
import Image from '../images/SafeWhiz-1.png'


    
const NavLoggedIn = () => {

  const [showBasic, setShowBasic] = useState(false);

  return (

 
<>   
  <MDBNavbar expand='lg' light bgColor='white'>
    <MDBContainer fluid>
      <MDBNavbarToggler
        onClick={() => setShowBasic(!showBasic)}
        aria-controls='navbarExample01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <FontAwesomeIcon icon={faBars} />
      </MDBNavbarToggler>

      <MDBNavbarItem active >
        <img src={Image} height="70px" width='70px'></img>
      </MDBNavbarItem>
      
      <MDBCollapse navbar show={showBasic}>
        <MDBNavbarNav right className='mb-2 mb-lg-0 d-flex'>
          

          <div className='d-flex m-3' id='nav-items'>

            <MDBNavbarItem active>
              <Link aria-current='page' to='./' className='nav-link'>
                Map
              </Link>
            </MDBNavbarItem>
            {/* <MDBNavbarItem>
              <Link to='./login' className='nav-link'>Login</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <Link to='./register' className='nav-link'>Register</Link>
            </MDBNavbarItem> */}
            <MDBNavbarItem>
              <Link to='./favorites' className='nav-link'>Favorite</Link>
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