import React, { useState } from 'react';
import {MDBNavbar, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBContainer, MDBIcon, MDBCollapse, MDBBtn} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import Image from '../images/SafeWhiz-1.png'

export default function App(props) {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <>
    <header>
      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
            <img src={Image} height="70px" width='70px'></img>
              </MDBNavbarItem>

              <div className='d-flex text-center m-3'>
              <MDBNavbarItem active>
                <Link aria-current='page' to='./' className='nav-link'>
                  Home
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='./login' className='nav-link'>Login</Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <Link to='./register' className='nav-link'>Register</Link>
              </MDBNavbarItem>
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

      {/* <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Heading</h1>
              <h4 className='mb-3'>Subheading</h4>
              <MDBBtn tag="a" outline size="lg">
                Call to action
              </MDBBtn>
            </div>
          </div>
        </div>
      </div> */}


    </header>
    {props.children}
    </>
  );
}