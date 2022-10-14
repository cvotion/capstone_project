import React, { useState } from 'react';
import {MDBNavbar, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBContainer, MDBIcon, MDBCollapse, MDBBtn} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import Image from '../images/SafeWhiz-1.png'


    
const NavPublic = () => {
  return (





<>


      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            // onClick={() => setShowBasic(!showBasic)}
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBCollapse navbar >
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
            <img src={Image} height="70px" width='70px'></img>
              </MDBNavbarItem>

              <div className='d-flex text-center m-3'>
              <MDBNavbarItem active>
                {/* <Link aria-current='page' to='./' className='nav-link'>
                  Home
                </Link> */}
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='./login' className='nav-link'>Login</Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <Link to='./register' className='nav-link'>Register</Link>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
              <Link to='./favorites' className='nav-link'>Favorite</Link>
              </MDBNavbarItem> */}
              {/* <MDBNavbarItem>
              <Link to='./signout' className='nav-link'>Sign Out</Link>
              </MDBNavbarItem> */}

              </div>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

   


  






</>





  )
}

export default NavPublic