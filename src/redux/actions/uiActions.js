import { UI_SET_ERROR, UI_REMOVE_ERROR } from "../reducers/uiReducer"


export const setError = (error) => ({
    type: UI_SET_ERROR,
    payload: error
});

export const removeError = () => ({
    type: UI_REMOVE_ERROR   
});
