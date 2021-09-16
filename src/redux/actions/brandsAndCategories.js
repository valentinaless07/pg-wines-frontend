import axios from "axios"

export function getInfo(info) {
    return async function (dispatch) {
        await axios.get('https://pg-delsur.herokuapp.com/'+info)
        .then(results=>{
            dispatch({
                type: 'GET_INFO_'+info.toUpperCase(),
                payload:results.data
            })
        })
    }
}

export function createElement(info, element){
    return async function(){
        await axios.post(`https://pg-delsur.herokuapp.com/${info}`, element)
    }
}

export function deleteElement(info, element){
    return async function(){
        await axios.delete(`https://pg-delsur.herokuapp.com/${info}/delete`, {data: {id: element}})
    }
}