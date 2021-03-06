export const getFirstName = (fullName) => {
    return fullName?.split(' ')[0];
}

export const saveStorage = (auth) => {
    localStorage.auth = JSON.stringify(auth);
}

export const dateToSpanishString = (date) => {
    if(!date) return;
    if(typeof date === 'string'){
        date = new Date(date);
    }

    let result = '';
    result += date.getDate();
    if (date.getMonth() < 10) {
        result += '/0' + (date.getMonth() + 1 + '/');
    } else {
        result += '/' + (date.getMonth() + 1 + '/');
    }
    result += date.getFullYear();
    return result;
}

export const dateToString = (date) => {
    if(!date) return;
    if(typeof date === 'string'){
        date = new Date(date);
    }

    let result = '';
    result += date.getFullYear();
    if (date.getMonth() < 10) {
        result += '-0' + (date.getMonth() + 1);
    } else {
        result += '-' + (date.getMonth() + 1);
    }
    result += '-' + date.getDate();
    return result;
}

export const sumToDate = (date, days) => {
    date.setDate(date.getDate() + 1);        
    return dateToString(date);   
}
export const restToDate = (date, days) => {
    date.setDate(date.getDate() - 1);        
    return dateToString(date);   
}

export const sortAlphabeticAsc = (a,b) => {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;
    return 0;
}

