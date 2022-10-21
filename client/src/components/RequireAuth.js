import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'





const RequireAuth = (props) => {


    const token = useSelector(state => state.token)
    const navigate = useNavigate();


    useEffect(() => {

        console.log("require auth", token);
        if(!token){

           
            navigate('/')

        }
  
    }, [])
    



  return props.children
}

export default RequireAuth