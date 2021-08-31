export const GET_PRODUCTS = 'GET_PRODUCTS';

const data = require('../../data/products').default
const images = require.context('../../data/images', false)

function importAll(r) {
    let images = {};
    // console.log(r.keys()[0])
    r.keys().map((item, index)=>{images[item.replace('./', '')] = r(item)});
    return images;
  }

  const img=importAll(images)

export const getProducts = ()=>{
    return function(dispatch){
        let newData=data.map(item=>{
            return{...item,
                image:img[item.image].default}})
        return dispatch({type: GET_PRODUCTS, payload: newData})
    }
}