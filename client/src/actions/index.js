import actionType from './actionType'
import thunk from 'redux-thunk'
import axios from 'axios' 




export const register = (formData, cb) => async dispatch=>{  // store.dispatch

    try{
        // api call to our backend
        dispatch({
            type: actionType.ERROR,
            data:""
        })
        let response = await axios.post('/register', formData)
        let jwt = response.data.token
        let userId = response.data.userId

        console.log("data retrieved from server");
        //take response from api call (jwt)
    
        //store token in global storage 

        dispatch({
            type: actionType.LOAD_USER_TOKEN, 
            data: {jwt, userId}
        })

        //store token in local storage 

        localStorage.setItem('token', {jwt, userId})
        cb()

    }
    catch(err){

        dispatch({
            type: actionType.ERROR, 
            data: err
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
        let response = await axios.post('/login', formData)
        // console.log(response, "token")
        let jwt = response.data.token
        let userId = response.data.userId
        console.log("data retrieved from server in login action");

        dispatch({
            type: actionType.LOAD_USER_TOKEN,
            data: {jwt, userId}

        })
          //store token in local storage
          localStorage.setItem('token',{jwt, userId})

          cb()
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionType.ERROR,
            data: "Invalid login credential"
        })
    }
}

export const signOut = (cb) => dispatch =>{

    dispatch({
        type: actionType.LOAD_USER_TOKEN, 
        data: ""

    })

    // clear local storage

    localStorage.removeItem('token')

    cb(); //navigate our user to some other page


}

export const checkToken = () => async dispatch => {
    if (localStorage.token){
        try {
            //api call to check if token is valid 

            let response = await axios.get('/protected', {
                headers:{
                    'authorization': localStorage.token
                }
            })

            if(response.data.isValid){
                dispatch({
                    type: actionType.LOAD_USER_TOKEN,
                    data: {jwt: localStorage.token.jwt, userId: localStorage.token.userId}
                })
            }
        } 
        
        catch (err) {

            dispatch({
                type: actionType.ERROR,
                data: err
            })
            
        }
    }
}

export const getFavoriteSpots = (formData, cb) => async dispatch =>{

    try {
        dispatch({
            type: actionType.ERROR,
            data:""
        })

        //api call to our backend /favSpot route
        let response = await axios.post('/favSpot', formData)
        console.log(response)
        //!continue working here

    } catch (error) {
        
    }
}

// export const addToFavorite = ()