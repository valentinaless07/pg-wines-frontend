
export let userTypes = {
    login: 'LOGIN',
}

let initialState = {
    loggedIn: true,
}

const  userReducer = (state = initialState, action) => {
    switch (action.type) {
    
        default:
            return state;
    }

}


export default userReducer;