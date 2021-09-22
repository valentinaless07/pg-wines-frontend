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
// const url = `${process.env.REACT_APP_BACKEND_URL}`;
const url = 'https://pg-delsur.herokuapp.com';
// const url = 'http://localhost:3001';

export const getOffers = () => {
    return async (dispatch, getState) => {
        let resp;
        dispatch({
            type: OFFERS_LOADING
        });
        try {           
            resp = await axios.get(url.concat(`/offers`));
            if (resp.status === 200) {
                dispatch({
                    type: OFFERS_GET_ALL,
                    payload: resp.data
                });
            } else {
                console.log('error interno')
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: OFFERS_ERROR,
                payload: error
            });
        }
    }
}

export const postOffers = (data, offerDays) => {
    return async (dispatch, getState) => { 
        const formData = new FormData();
        formData.append('status', data.status.toString());
        formData.append('image', data.image);
        formData.append('categoryId', data.categoryId.toString());
        formData.append('from', data.from);
        formData.append('until', data.until);
        formData.append('discount', data.discount.toString());
        formData.append('slug', data.slug.toString()); 
        formData.append('offerDays', offerDays); 


        dispatch({
            type: OFFERS_LOADING
        });

        try {
           
            let resp = '';
            resp = await axios.post(url.concat('/offers'), formData);
            if (resp.status === 200) {
                const result = await resp.data;
                dispatch({
                    type: OFFERS_PUT,
                    payload: result
                });
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Imagen cargada correctamente.',
                });

                return result;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error inesperado, si el error persiste contactar al administrador del sistema.',
                });
                throw await resp;
            }
        } catch (error) {
            dispatch({
                type: OFFERS_ERROR,
                payload: error.response.data.error,
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error,
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
            await axios.put(url.concat('/offers/update'), { id: id, status: status.toString() });
            await getOffers()(dispatch, getState);
            dispatch({
                type: OFFERS_UPDATE,
            });
           
        } catch (error) {
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
            await axios.delete(url.concat('/offers/delete'), { data: { id: id } });
            dispatch({
                type: OFFERS_DELETE,
                payload: id
            });
            Swal.fire({
                icon: 'success',
                title: 'OK',
                text: 'Oferta eliminada correctamente.',
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

