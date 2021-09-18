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
const url = `${process.env.REACT_APP_BACKEND_URL}`;

export const getOffers = () => {
    return async (dispatch, getState) => {
        let resp;
        dispatch({
            type: OFFERS_LOADING
        });
        try {
            // results = await axios.get(`https://pg-delsur.herokuapp.com/offers`);
            // console.log('env', process.env.REACT_APP_BACKEND_URL);

            resp = await axios.get(url.concat(`/offers`));
            console.log('ale----->',resp.data)
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

export const postOffers = (data) => {
    return async (dispatch, getState) => {
        // const url = 'https://pg-delsur.herokuapp.com/offers';
        // const url = `${process.env.REACT_APP_BACKEND_URL}/offers`;
        const formData = new FormData();
        formData.append('status', data.status.toString());
        formData.append('image', data.image);
        formData.append('categoryId', data.categoryId.toString());
        formData.append('from', data.from);
        formData.append('until', data.until);
        formData.append('discount', data.discount.toString());
        formData.append('slug', data.slug.toString());       

        dispatch({
            type: OFFERS_LOADING
        });

        try {
           
            let resp = '';
            resp = await axios.post(url.concat('/offers'), formData);
            // resp = await axios.post(process.env.REACT_APP_BACKEND_URL, formData);     
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
                    text: 'Error inesperado 1, si el error persiste contactar al administrador del sistema.',
                });
                throw await resp;
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
            // await axios.put(`https://pg-delsur.herokuapp.com/offers/update`, { id: id, status: status.toString() });
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/offers/update`, { id: id, status: status.toString() });
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
            // await axios.delete(`https://pg-delsur.herokuapp.com/offers/delete`, { data: { id: id } });
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/offers/delete`, { data: { id: id } });
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

