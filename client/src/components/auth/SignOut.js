import React from "react";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {signOut} from '../../actions'
import {MDBBtn} from 'mdb-react-ui-kit';

const SignOut = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()


  const logout = () => { 

    dispatch(signOut(()=>{
      navigate('/login')
    }))

  }


  return (
  <div style={{height: "75vh"}} className="d-flex flex-column justify-content-center align-items-center">
    <h1 className="text-black">Goodbye</h1>
    <div>
      <img
        src="https://static.thenounproject.com/png/4917748-200.png"
        alt="sign"
      />
    </div>
    <h3 className="text-black">...sorry to see you go!</h3>


    {/* <button onClick={logout}>Sign Out</button> */}
    <MDBBtn outline className='mx-2 px-5 text-black' color='black' size='lg' onClick={logout}>
    Sign Out
    </MDBBtn>
  </div>
  )
};

export default SignOut;

