import React, {useState} from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signIn} from '../../actions'
import { useNavigate } from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

const Login = () => {

  const errorMessageFromRedux = useSelector(state => state.error)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
   
    e.preventDefault()
    console.log(errorMessageFromRedux)  
    dispatch(signIn({email, password}, ()=>{
      navigate('/')
     
    }))


  }

  

  return (
    <>

   

<MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-light text-grey my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
      
        <p className="text-grey-50 mb-5">Please enter your login and password!</p>

        
        <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-grey' label='Email' id='formControlLg' type='email' size="lg" onChange={e=>setEmail(e.target.value)}/>
        <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-grey' label='Password' id='formControlLg' type='password' size="lg" onChange={e=>setPassword(e.target.value)}/>

        <p className="small mb-3 pb-lg-2"><a className="text-grey-50" href="#!">Forgot password?</a></p>
        
        <MDBBtn outline className='mx-2 px-5 text-grey' color='white' size='lg' onClick={handleSubmit}>
          Login
        </MDBBtn>

        <h2>{errorMessageFromRedux}</h2>

        {/* <div className='d-flex flex-row mt-3 mb-5 text-white'>
          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="lg"/>
          </MDBBtn>
        </div>  */}

        <div>
          <p className="mb-0">Don't have an account? <a href="/register" className="text-grey-50 fw-bold">Sign Up</a></p>

        </div>
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>

    </>
  )
}

export default Login
