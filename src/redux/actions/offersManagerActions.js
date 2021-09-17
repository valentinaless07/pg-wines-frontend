import axios from 'axios';
import Swal from 'sweetalert2';
export const OFFERS_LOADING = 'OFFERS_LOADING';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_ERROR = 'OFFERS_ERROR';
export const OFFERS_REMOVE_ERROR = 'OFFERS_REMOVE_ERROR';
export const OFFERS_GET_ALL = 'OFFERS_GET_ALL';
export const OFFERS_PUT = 'OFFERS_PUT';
export const OFFERS_DELETE = 'OFFERS_DELETE';
export const OFFERS_UPDATE = 'OFFERS_UPDATE';


export const getOffers = () => {
    return async (dispatch, getState) => {
        let results;
        dispatch({
            type: OFFERS_LOADING
        });
        try {
            results = await axios.get(`https://pg-delsur.herokuapp.com/offers`);
            dispatch({
                type: OFFERS_GET_ALL,
                payload: results.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: OFFERS_ERROR,
                payload: error
            });
        }
    }
}

export const postOffers = (data, files) => {
// export const postOffers = (data, file, slug, productId, status) => {
    return async (dispatch, getState) => {
        console.log({data});
        const url = 'https://pg-delsur.herokuapp.com/offers';
        const formData = new FormData();
        formData.append('status', data.status);
        formData.append('files', [data.image]);
        formData.append('categoryId', data.categoryId);
        formData.append('discount', data.discount);
        formData.append('from', new Date());
        formData.append('until', new Date());
        formData.append('slug', data.slug);
        // formData.append('productId', productId);
        dispatch({
            type: OFFERS_LOADING
        });

        try {
            const resp = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (resp.ok) {
                const result = await resp.json();
                dispatch({
                    type: OFFERS_PUT,
                    payload: result
                });

                return result;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error inesperado 1, si el error persiste contactar al administrador del sistema.',
                });
                throw await resp.json();
            }
        } catch (error) { 
            console.log(error);          
            dispatch({
                type: OFFERS_ERROR,
                payload: error,
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error inesperado 2, si el error persiste contactar al administrador del sistema. ${JSON.stringify(error)}`,
            });
        }
    }
}


export const updateOfferById = (id, status) => {
    return async (dispatch, getState) => {       
        dispatch({
            type: OFFERS_LOADING
        });
        try {
            await axios.put(`https://pg-delsur.herokuapp.com/offers/update`, { id: id, status: status.toString() });
            await getOffers()(dispatch, getState);
            dispatch({
                type: OFFERS_UPDATE,

            });
        } catch (error) {
            // console.log(error);
            // console.log(results);
            dispatch({
                type: OFFERS_ERROR,
                payload: error
            });
        }
    }
}

export const deleteOfferById = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: OFFERS_LOADING
        });
        try {
            await axios.delete(`https://pg-delsur.herokuapp.com/offers/delete`, { data: { id: id } });
            dispatch({
                type: OFFERS_DELETE,
                payload: id
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: OFFERS_ERROR,
                payload: error
            });
        }
    }
}

