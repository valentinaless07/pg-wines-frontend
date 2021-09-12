import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProducts, getFilteredProductsList } from '../../redux/actions/userActions';
import { getCategories } from '../../redux/actions/manageProductsActions';
import ProductsContainer from './productsContainer';
import './productList.css'
import { useHistory } from 'react-router';

function ProductList({state, manageProductState, getFilteredProductsList, getProducts, getCategories}) {

    useEffect(()=>{        
        getProducts();
        getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let history = useHistory();

    const [values, setValues] = useState({
        categoryId:'',
        initPrice:'',
        finalPrice:''
    })

    function activeFilter(){
        document.getElementById('sidebar').classList.toggle('filterActive')
        document.getElementById('filter').classList.toggle('btnFilterActive')
    }

    function valueFilter(e){
        let filter = e.target.value
        if(e.target.id === 'category'){
            filter= e.target.options[e.target.options.selectedIndex].id
        }
        setValues({
            ...values,
            [e.target.name]: filter
        })
    }

    function handleSubmit(){
        if(values.finalPrice<values.initPrice){
            values.finalPrice=''
        }
        history.push({search:`?category=${values.categoryId}&initPrice=${values.initPrice}&finalPrice=${values.finalPrice}`})
        getFilteredProductsList(values)
        let category = document.getElementById('category')
        category.selectedIndex=category.options[0]
        setValues({
            categoryId: '',
            initPrice: '',
            finalPrice: ''
        })
    }

    function clear(){
        let category = document.getElementById('category')
        category.selectedIndex=category.options[0]
        setValues({
            categoryId: '',
            initPrice: '',
            finalPrice: ''
        })
        history.push({search:''})

            getProducts()
    }

    return (
        <React.Fragment>
                <div id='sidebar' className='filter'>
                    <span className='filterTittle'>BUSQUEDA</span>
                    <span onClick={activeFilter} id='filter' className='filterBtn'><i className="fas fa-filter"></i></span>
                    <div className='filterOptions'>
                        <select onChange={valueFilter} name='categoryId' id='category' defaultValue={'DEFAULT'}>
                            <option disabled value='DEFAULT'>Categoria</option>
                            {
                                manageProductState.map(category=><option id={category.id} key={category.id}>{category.name}</option>)
                            }
                        </select><br/>
                        {/* <select name='branch' id='branch' defaultValue={'DEFAULT'}>
                            <option disabled value='DEFAULT'>Marca</option>
                        </select><br/> */}
                        <span className='priceFilter'>PRECIO $</span>
                        <div className='valuesMM'>
                            <div>
                            <span>Min $</span><input onChange={valueFilter} type="number" name="initPrice" id="minValue" className='value' value={values.initPrice} />
                            </div>
                            <div>
                            <span>Max $</span><input onChange={valueFilter} type="number" name="finalPrice" id="maxValue" className='value' value={values.finalPrice} />
                            </div>
                        </div>
                        <button onClick={clear} id='clean'>Limpiar filtros <i className="fas fa-broom"></i></button>
                        <button onClick={handleSubmit} type='submit' id='search' >Buscar <i className="fas fa-search"></i></button>
                    </div>
                </div>
        
            {state.products ? <ProductsContainer state={state}/> : <h1>Cargando...</h1>}            
        </React.Fragment>
    )
}

function MapStateToProps(state){
    return{
        state: state.products.products,
        manageProductState: state.manageProducts.categories
    }
}

export default connect(MapStateToProps, {getProducts, getFilteredProductsList, getCategories})(ProductList)