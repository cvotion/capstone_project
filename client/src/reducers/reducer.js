
import actionType from '../actions/actionType';

const initialState = {

    token: "", 
    error: "",
    userId: "",
    favorites: []

}

const reducerTemplate = (state = initialState, action) => {
console.log("initialstate", initialState, state);
    switch(action.type){
       
        case actionType.LOAD_USER_TOKEN:
            console.log("checkpoint 1", action.data);
            return {
                ...state, 
                // token: action.data
                token: action.data.jwt,
                userId: action.data.userId
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

        case actionType.GET_FAV_SPOTS:
            return {
                ...state,
                favorites: action.data
            }
        default:
            return state;
    } 

    return state;
}
console.log("reducer")

export default reducerTemplate