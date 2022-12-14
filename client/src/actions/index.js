import actionType from './actionType'
import thunk from 'redux-thunk'
import axios from 'axios' 
import { json } from 'react-router-dom'




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
        console.log("jwt token", jwt)
        let userId = response.data.userId
        console.log("data retrieved from server in login action");

        dispatch({
            type: actionType.LOAD_USER_TOKEN,
            data: {jwt, userId}

        })
          //store token in local storage
          let t = {jwt, userId}
          let ts = JSON.stringify(t)
          localStorage.setItem('token',ts)

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
   
    let token = JSON.parse(localStorage.token)  //grabbing token form local storage
   
    
        try {
            //api call to check if token is valid 
            
            let response = await axios.get('/protected', {
                headers:{
                    'authorization': token.jwt
                }
            })

            if(response.data.isValid){
                dispatch({
                    type: actionType.LOAD_USER_TOKEN,
                    data: {jwt: token.jwt, userId: token.userId}
                    // data: localStorage.token.jwt
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

export const addFavoriteSpots = (formData) => async dispatch=>{
    console.log("inside add favorite spots action");

    try {
         // /addFav is a route set up in the authentication.js 
        let response = await axios.post('/addFav', formData)
        console.log("inside add fav action", response.data);
        dispatch({
            type: actionType.ADD_FAV,
            data: response.data
        })
    } catch (error) {
        dispatch({
            type: actionType.ERROR,
            data: "can't add to the list"
        })
    }
   

}

// export const getFavoriteSpots = (formData) => async dispatch =>{
// //pass the userid from redux
// console.log("userId", formData);
//     try {
//         dispatch({
//             type: actionType.ERROR,
//             data:""
//         })

//         //api call to our backend /favSpot route
//         let response = await axios.post('/favSpot', formData)
//         console.log("inside getfav action", response)
//         //!continue working here


//         dispatch({
//             type: actionType.GET_FAV_SPOTS,
//             data: response.data

//         })

//     } catch (error) {
//         dispatch({
//             type: actionType.ERROR,
//             data: "can't access fav collection in database"
//         })
//     }
// }

// export const addToFavorite = ()