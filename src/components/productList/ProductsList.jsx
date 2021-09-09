import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProducts, getProductsbyCategory } from '../../redux/actions/userActions';
import { getCategories } from '../../redux/actions/manageProductsActions';
import ProductsContainer from './productsContainer';
import './productList.css'

function ProductList({state, manageProductState, getProductsbyCategory, getProducts, getCategories}) {

    useEffect(()=>{        
        getProducts();
        getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(state.products)
    const [values, setValues] = useState({
        min: '',
        max: ''
    })

    function activeFilter(){
        document.getElementById('sidebar').classList.toggle('filterActive')
        document.getElementById('filter').classList.toggle('btnFilterActive')
    }

    function handleFilter(name){
        let value = document.getElementById('category')
        let selected = value.options[value.selectedIndex].text
        selected!=='Clear All' ?
        getProductsbyCategory(selected.replace(' ','%20'))
        :
        getProducts()
    }

    function valueFilter(e){
    e.target.value>0&&
    setValues({
        ...values,
        [e.target.name]: e.target.value
    })
    }

    function handleSubmit(e){
        e.preventDefault()
        let category = document.getElementById('category')
        let branch = document.getElementById('branch')
        category.selectedIndex = category.options[0].value
        branch.selectedIndex = branch.options[0].value
        setValues({
            min: '',
            max: ''
        })

    }

    return (
        <React.Fragment>
            <form action="" onSubmit={handleSubmit}>
                <div id='sidebar' className='filter'>
                    <span className='filterTittle'>BUSQUEDA</span>
                    <span onClick={activeFilter} id='filter' className='filterBtn'><i className="fas fa-filter"></i></span>
                    <div className='filterOptions'>
                        <select name='categories' id='category' onChange={handleFilter} defaultValue={'DEFAULT'}>
                            <option disabled value='DEFAULT'>Categoria</option>
                            {
                                manageProductState.map(category=><option key={category.id}>{category.name}</option>)
                            }
                        </select><br/>
                        <select name='branch' id='branch' defaultValue={'DEFAULT'}>
                            <option disabled value='DEFAULT'>Marca</option>
                        </select><br/>
                        <span className='priceFilter'>PRECIO $</span>
                        <div className='valuesMM'>
                            <div>
                            <span>Min $</span><input onChange={valueFilter} type="number" name="min" id="minValue" className='value' value={values.min} />
                            </div>
                            <div>
                            <span>Max $</span><input onChange={valueFilter} type="number" name="max" id="maxValue" className='value' value={values.max} />
                            </div>
                        </div>
                        <button type='submit' id='clean'>Limpiar filtros <i className="fas fa-broom"></i></button>
                        <button type='submit' id='search' >Buscar <i className="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
        
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

export default connect(MapStateToProps, {getProducts, getProductsbyCategory, getCategories})(ProductList)