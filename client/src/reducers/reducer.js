
import actionType from '../actions/actionType';

const initialState = {

    token: "", 
    error: ""

}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){
        case actionType.LOAD_USER_TOKEN:
            return {
                ...state, 
                token: action.data
            }

        case actionType.ERROR: 
            return {
                ...state, 
                error: action.data
            }
        
        default:
            return state;
    } 
}


export default reducerTemplate