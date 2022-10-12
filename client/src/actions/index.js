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

/**
 * Loggin in user
 */

 export const signIn = (formData, cb) => async dispatch=>{
    try {
        dispatch({
            type: actionType.ERROR,
            data:""
        })
        
        
        //api call to our backend /login route
        let response = await axios.get('/getUsers', formData)
        let jwt = response.data.token
        console.log("data retrieved from server");

        dispatch({
            type: actionType.LOAD_USER_TOKEN,
            data: jwt
        })
          //store token in local storage
          localStorage.setItem('token',jwt)

          cb()
        
    } catch (error) {
        console.log("error message 1")
        dispatch({
            type: actionType.ERROR,
            data: "Invalid login credential"
        })
    }
}