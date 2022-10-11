
import actionTypes from '../actions/actionType';

const initialState = {

    token: "", 
    error: ""

}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.LOAD_USER_TOKEN:
            return {
                ...state, 
                token: action.data
            }

        case actionTypes.ERROR: 
            return {
                ...state, 
                error: action.data
            }
        
        default:
            return state;
    } 
}


export default reducerTemplate