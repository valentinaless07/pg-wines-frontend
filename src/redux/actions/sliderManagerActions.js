// import Swal from 'sweetalert2';
export const SLIDER_LOADING = 'SLIDER_LOADING';
export const SLIDER_SUCCESS = 'SLIDER_SUCCESS';
export const SLIDER_ERROR = 'SLIDER_ERROR';
export const SLIDER_GET_IMAGES = 'SLIDER_GET_IMAGES';
export const SLIDER_PUT_IMAGE = 'SLIDER_PUT_IMAGE';
export const SLIDER_DELETE_IMAGE = 'SLIDER_DELETE_IMAGE';
export const SLIDER_UPDATE_IMAGE = 'SLIDER_UPDATE_IMAGE';
export const SLIDER_REMOVE_ERROR = 'SLIDER_REMOVE_ERROR';

export const getSliderImagesAction = () => {
    return (dispatch, getState) => {
        dispatch({
            type:SLIDER_LOADING
        });
        dispatch({
            type: SLIDER_GET_IMAGES
        });
        
    }
}

