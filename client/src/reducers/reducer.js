
import actionType from '../actions/actionType';

const initialState = {

    token: "", 
    error: "",
    userId: "",
    favorites: []

}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){
       
        case actionType.LOAD_USER_TOKEN:
            console.log("checkpoint 1", action.data.jwt);
            return {
                ...state, 
                token: action.data
                // token: action.data.jwt,
                // userId: action.data.userId
            }

        case actionType.ERROR: 
        console.log("checkpoint 2");
            return {
                ...state, 
                error: action.data
            }
        case actionType.ADD_FAV:
            return {
                ...state,
                favorites: state.favorites.concat(action.data)
            }
        default:
            return state;
    } 
    console.log("reducer", state)
    return state;
}


export default reducerTemplate