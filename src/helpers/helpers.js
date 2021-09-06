export const getFirstName = (fullName) => {    
    return fullName?.split(' ')[0];
}

export const saveStorage = (auth) => {
    localStorage.auth = JSON.stringify(auth);
}
