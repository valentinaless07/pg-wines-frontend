import axios from 'axios'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const PRODUCT_DETAIL_RESET = 'PRODUCT_DETAIL_RESET';

// const productExample = {
//     name: "Restinga Destilado de Otoño",
//     image: "https://www.fullescabio.com/productos/1629225648/01_1629225648.jpg",
//     description: `Destilado con enebro de la Patagonia Argentina y piel de limón;
//     está macerado en Arándanos, flor de Hibiscus y cedrón. Es un gin rosado,
//      muy fácil de tomar y se pueden percibir muy fácilmente 
//      los aromas de la flor china y el cedrón`,
//     price: 1960,
//     brand: "",
//     capacity: ""
// };

// export const getProductDetail = (id) => {
//     return (dispatch) =>
//         // fetch(`http://localhost:3001/pokemons/${id}`)
//         //     .then((answer) => answer.json())
//         //     .then((answer) =>
//         //         dispatch({
//         //             type: GET_POKEMON_BY_ID,
//         //             payload: answer
//         //         }))
        

//         dispatch({
//             type: GET_PRODUCT_BY_ID,
//             payload: productExample
//         })
// };

export const getProductDetail=(id)=>{
    return async function(dispatch){
        await axios.get('https://pg-delsur.herokuapp.com/products/'+id)
        .then(results =>{            
            dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: results.data
            })
        })
    }
}

export const getProductDetailReset = () => {
    return (dispatch) => {
        dispatch({
            type: PRODUCT_DETAIL_RESET,
            payload: []
        })
    }
};