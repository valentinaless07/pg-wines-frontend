import axios from "axios"

export function postProductCreated(payload) {

    return async function () {

        // const res = await axios.post("https://pg-delsur.herokuapp.com/products", payload)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/products`, payload)


        return res
    }
}

export function getCategories() {
    return async function (dispatch) {
        // var json = await axios.get("https://pg-delsur.herokuapp.com/categories")
        var json = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`)


        return dispatch({
            type: "GET_CATEGORIES",
            payload: json.data
        })
    }
}

export function getProductsPagination() {
    return async function (dispatch) {
        // var json = await axios.get("https://pg-delsur.herokuapp.com/products?itemsPerPage=20&orderBy=id")
        var json = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products?itemsPerPage=20&orderBy=id`)


        return dispatch({
            type: "GET_PRODUCTS_PAGINATION",
            payload: json.data
        })
    }

}

export const getProductsPage = (page) => {
    return async function (dispatch) {
        // await axios.get("https://pg-delsur.herokuapp.com/products?itemsPerPage=20&orderBy=id&page=" + page)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products?itemsPerPage=20&orderBy=id&page=` + page)
            .then(results => {
                dispatch({
                    type: "GET_PRODUCTS_PAGE",
                    payload: results.data
                })
            })
    }
}


export function deleteProduct(payload) {

    return async function () {


        // const resp = await axios.delete("https://pg-delsur.herokuapp.com/products/delete", { data: { id: payload } })
        const resp = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/products/delete`, { data: { id: payload } })

        return resp
    }
}

export function updateProduct(payload) {

    return async function () {
        if (typeof payload.categoryId === "object") { payload.categoryId = payload.categoryId.id }
        if (typeof payload.brandId === "object") { payload.brandId = payload.brandId.id }
        if (typeof payload.packingId === "object") { payload.packingId = payload.packingId.id }

        // const respuesta = await axios.put("https://pg-delsur.herokuapp.com/products/update", payload)
        const respuesta = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/products/update`, payload)

        return respuesta
    }
}

export function getBrands() {
    return async function (dispatch) {
        // var json = await axios.get("https://pg-delsur.herokuapp.com/brands")
        var json = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/brands`)



        return dispatch({
            type: "GET_BRANDS",
            payload: json.data
        })
    }
}

export function getPacking() {
    return async function (dispatch) {
        // var json = await axios.get("https://pg-delsur.herokuapp.com/packing")
        var json = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/packing`)



        return dispatch({
            type: "GET_PACKING",
            payload: json.data
        })
    }
}

export function getAllProductsSlider() {
    return async function (dispatch) {
        // var json = await axios.get("https://pg-delsur.herokuapp.com/products?itemsPerPage=300");       
        var json = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products?itemsPerPage=300`);       
        if (json.data?.products) {
            const products = json.data.products;
           
            return dispatch({
                type: "GET_ALL_PRODUCTS_SLIDER",
                payload: products,
            });
        }

    }

}