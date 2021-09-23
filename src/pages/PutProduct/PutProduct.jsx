import React from 'react';
import styles from './PutProduct.module.css'
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getProductDetailReset } from '../../redux/actions/productDetailsActions';
import { updateProduct } from '../../redux/actions/manageProductsActions';
import Swal from 'sweetalert2'
import { getCategories } from '../../redux/actions/manageProductsActions';
import { getProductsPagination } from '../../redux/actions/manageProductsActions';
import { getBrands } from '../../redux/actions/manageProductsActions';
import { getPacking } from '../../redux/actions/manageProductsActions';


const PutProduct = ({updateProduct, getProductDetailReset, product_detail, manageProductsState, getCategories, getBrands, getPacking}) => {
    
    

   

    useEffect(() => {
        getCategories()
        getBrands()
        getPacking()
    } , [getCategories, getBrands, getPacking]);

       
    
    const [detailData, setDetailData] = useState(
        {
            id: product_detail.id,
            name: product_detail.name,
            description: product_detail.description,
            cost: product_detail.cost,
            capacity: product_detail.capacity,
            stock: product_detail.stock,
            categoryId: product_detail.category,
            brandId: product_detail.brand,
            packingId: product_detail.packing
            
        }
    )
    

    


    useEffect(() => {
        
        getProductDetailReset()
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [getProductDetailReset])
    
      
      

    const [errors, setErrors] = useState({})


    function handleChange (e) {
        
        setDetailData({...detailData, [e.target.name] : e.target.value})
        
        setErrors(validate({
            ...detailData,
            [e.target.name] : e.target.value
        }))
    
    }

        

    function validate(input) {
        let errors = {}

        if(!input.name){
            errors.name = "Ingrese un nombre"
        }
        else if(!input.cost){
            errors.cost = "Ingrese un precio"
        }

        else if(!input.capacity){
            errors.capacity = "Ingrese una capacidad"
        }

        
        

        return errors

    }
    

    function handleSubmit (e) {
        e.preventDefault()
        
          let validateSubmit = validate(detailData)
          
        
        if(Object.keys(validateSubmit).length === 0){
            

            
                updateProduct(detailData)
                Swal.fire('Producto Editado')
                // history.push("/manageProducts")
                
            
        }
        else{
            Swal.fire('Completar todos los campos requeridos')
        }
    }


    return (
        
        <div>

        
        <Link to="/manageProducts" className={styles.backIcon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>
        

        <div className={styles.container}>
            <h1>Editar producto</h1>
            <div className={styles.container_form}>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>

                <div className={styles.inputContainer}>
                    <label>Nombre:</label>
                    <input className={styles.input_text} value={detailData.name || ""} onChange={e => handleChange(e)} name="name" type="text"/>
                </div>
                    {errors.name && (<p className={styles.error}>{errors.name}</p>)}

                <div className={styles.inputContainer}> 
                    <label>Descripción:</label>
                    <input className={styles.input_text} value={detailData.description || ""} onChange={e => handleChange(e)} name="description" type="text"/>
                </div>

                <div className={styles.inputContainer}>
                    <label>Precio:</label>
                    <input className={styles.input_text} value={detailData.cost || ""} onChange={e => handleChange(e)} name="cost" type="number"/>
                </div>
                    {errors.cost && (<p className={styles.error}>{errors.cost}</p>)}

                <div className={styles.inputContainer}>
                    <label>Capacidad (ml):</label>
                    <input className={styles.input_text} value={detailData.capacity || ""} onChange={e => handleChange(e)} name="capacity" type="number"/>
                </div>
                    {errors.capacity && (<p className={styles.error}>{errors.capacity}</p>)}

                <div className={styles.inputContainer}>
                    <label>Stock:</label>
                    <input className={styles.input_text} value={detailData.stock || ""} onChange={e => handleChange(e)} name="stock" type="number"/>
                </div>

                
                <div className={styles.select_container}>
                    <label>Category:</label>
                    <select className={styles.select} name="categoryId" onChange={e => handleChange(e)} defaultValue={detailData.categoryId.name}>
                        <option disabled>{detailData.categoryId.name}</option>
                        
                        {
                            manageProductsState.categories && manageProductsState.categories.map(el => {
                                    return <option value={el.id} key={el.id} >{el.name}</option>
                            })
                        }
                    </select>
                    
                </div>
                <div className={styles.select_container}>
                    <label>Marca:</label>
                    <select className={styles.select} name="brandId" onChange={e => handleChange(e)} defaultValue={detailData.brandId.name}>
                        <option disabled>{detailData.brandId.name}</option>
                        {manageProductsState.brands && manageProductsState.brands.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                </div>
                    {errors.brandId && (<p className={styles.error}>{errors.brandId}</p>)}  
                <div className={styles.select_container}>
                    <label>Packing:</label>
                    <select className={styles.select} name="packingId" onChange={e => handleChange(e)} defaultValue={detailData.packingId.name}>
                        <option disabled>{detailData.packingId.name}</option>
                        {manageProductsState.packing && manageProductsState.packing.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                </div>     
                    {errors.packingId && (<p className={styles.error}>{errors.packingId}</p>)}    

                <button className={styles.buttonSubmitForm} type="submit">Enviar Producto</button>

            </form>
            </div>
        </div>
        </div>
       
            
        
    );
}

const mapStateToProps = (state) => {
    return {
        product_detail: state.products.product_detail,
        manageProductsState: state.manageProducts
        
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetailReset: () => dispatch(getProductDetailReset()),
        updateProduct: (detailData) => dispatch(updateProduct(detailData)),
        getCategories: () => dispatch(getCategories()),
        getProductsPagination: () => dispatch(getProductsPagination()),
        getBrands: () => dispatch(getBrands()),
        getPacking: () => dispatch(getPacking())

    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(PutProduct);