export const getFirstName = (fullName) => {
    return fullName.displayName.split(' ')[0];
}

export const saveStorage = (auth) => {
    localStorage.auth = JSON.stringify(auth);
}
