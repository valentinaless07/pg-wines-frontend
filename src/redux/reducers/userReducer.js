
export let userTypes = {
    login: 'LOGIN',
}

let initialState = {
    loggedIn: false,
    product_detail: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.login:

            break;

        case 'GET_PRODUCT_BY_ID':
            return {
                ...state,
                product_detail: action.payload
            }
        case 'PRODUCT_DETAIL_RESET':
            return {
                ...state,
                product_detail: action.payload
            }

        default:
            return state;
    }

}


export default userReducer;