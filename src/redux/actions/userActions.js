export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const FILTER_BY = 'FILTER_BY'

const data = require('../../data/products').default
const images = require.context('../../data/images', false)

function importAll(r) {
    let images = {};
    // console.log(r.keys()[0])
    r.keys().map((item, index)=>{images[item.replace('./', '')] = r(item)});
    return images;
  }

  const img=importAll(images)

  const {category} = require('../../data/other')

export const getProducts = ()=>{
    return function(dispatch){
        let newData=data.map(item=>{
            return{...item,
                image:img[item.image].default}})
        return dispatch({type: GET_PRODUCTS, payload: newData})
    }
}

export const getCategory = ()=>{
    return function(dispatch){
        return dispatch({type: GET_CATEGORY, payload: category})
    }
}

export const filteredBy = (idCategory, state)=>{
    let filtered= state.filter(item=>item.category===idCategory)
    return function(dispatch){
        return dispatch({type: FILTER_BY, payload: filtered})
    }
}