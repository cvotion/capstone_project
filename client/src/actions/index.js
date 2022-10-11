import actionType from './actionType'
import thunk from 'redux-thunk'
import axios from 'axios' 




export const register = (formData, cb) => async dispatch=>{  // store.dispatch

    try{
        
        // api call to our backend

        let response = await axios.post('/createUser', formData)

        let jwt = response.data.token


        console.log("data retrieved from server");
        //take response from api call (jwt)
    
        //store token in global storage 

        dispatch({
            type: actionType.LOAD_USER_TOKEN, 
            data: jwt
        })



        //store token in local storage 

        localStorage.setItem('token', jwt)


        cb()

    }
    catch(err){

        dispatch({
            type: actionType.ERROR, 
            data: 'email in use'
        })

    }
}