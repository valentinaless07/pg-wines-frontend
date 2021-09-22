import axios from "axios";

export function postCommnets(idUser, review){
    return async function(){
        const response= await axios.post(`https://pg-delsur.herokuapp.com/review/${idUser}`, review)
        // const prueba=await axios.post(`http://localhost:3001/review/${idUser}`, review)
        return response
    }
}

// export default function updateComments(){

// }

// export default function deleteComments(){

// }