export const UI_SET_ERROR = "UI_SET_ERROR";
export const UI_REMOVE_ERROR = "UI_REMOVE_ERROR";

const inititalState = {
    loading: false,
    msgError: null,
}



const uiReducer = (state = inititalState, action) => {
    switch (action.type) {
        case UI_SET_ERROR:
            return {
                ...state,
                msgError: action.payload
            }
        case UI_REMOVE_ERROR:
            return {
                ...state,
                msgError: null
            }
            
    
        default:
            return state;
    }
}

export default uiReducer;