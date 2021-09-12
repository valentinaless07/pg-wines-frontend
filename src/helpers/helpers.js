export const getFirstName = (fullName) => {
    return fullName?.split(' ')[0];
}

export const saveStorage = (auth) => {
    localStorage.auth = JSON.stringify(auth);
}

export const fileUpload = async(status, file, slug, productId) => {
                           
    const url = 'https://pg-delsur.herokuapp.com/offers';
    const formData = new FormData();
    formData.append('status', status);
    formData.append('image', file);
    formData.append('slug', slug);
    formData.append('productId', productId);
    // console.log(JSON.stringify(formData));
    
    try{
        const resp = await fetch(url, {
            method: 'POST',
            body: formData, 
        });
        // console.log('1:', resp);
        if(resp.ok){
            const result = await resp.json();
            // console.log('2:', result);
            return result;
        }else{
            throw await resp.json();
        }
    }catch(error){
        console.log(error);
        throw error;
    }

}
