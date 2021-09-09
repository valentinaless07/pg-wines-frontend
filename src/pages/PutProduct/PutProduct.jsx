import React from 'react';
import styles from './PutProduct.module.css'
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getProductDetailReset } from '../../redux/actions/productDetailsActions';
import { updateProduct } from '../../redux/actions/manageProductsActions';
import Swal from 'sweetalert2'
import { getCategories } from '../../redux/actions/manageProductsActions';
import { getProducts } from '../../redux/actions/manageProductsActions';


const PutProduct = ({updateProduct, getProductDetailReset, product_detail, categories, getCategories, getProducts}) => {
    
    let history = useHistory()


    useEffect(() => {
        getCategories()
        
    } , []);

    const [firstCategory, setFirstCategory] = useState({category: product_detail.category})
    const [detailData, setDetailData] = useState(
        {
            id: product_detail.id,
            name: product_detail.name,
            description: product_detail.description,
            cost: product_detail.cost,
            capacity: product_detail.capacity,
            stock: product_detail.stock,
            discount: product_detail.discount,
            category: product_detail.category
            
        }
    )
    

    if(detailData.name === undefined){
        history.push('/manageProducts')
    }


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
    
            if(detailData.category === firstCategory.category){
                let categId = categories.find(el => el.name === firstCategory.category).id
                setDetailData(
                    {
                        ...detailData,
                        category: categId
                    }
                )
                updateProduct(detailData)
                Swal.fire('Producto Editado')
                history.push("/manageProducts")
                getProducts()
            }
            else{
                updateProduct(detailData)
                Swal.fire('Producto Editado')
                history.push("/manageProducts")
                getProducts()
            }
            
            
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
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>

                <div>
                    <label>Nombre:</label>
                    <input value={detailData.name || ""} onChange={e => handleChange(e)} name="name" type="text"/>
                    {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                </div>

                <div>
                    <label>Descripción:</label>
                    <input value={detailData.description || ""} onChange={e => handleChange(e)} name="description" type="text"/>
                </div>

                <div>
                    <label>Precio:</label>
                    <input value={detailData.cost || ""} onChange={e => handleChange(e)} name="cost" type="number"/>
                    {errors.cost && (<p className={styles.error}>{errors.cost}</p>)}
                </div>

                <div>
                    <label>Capacidad (ml):</label>
                    <input value={detailData.capacity || ""} onChange={e => handleChange(e)} name="capacity" type="number"/>
                    {errors.capacity && (<p className={styles.error}>{errors.capacity}</p>)}
                </div>

                <div>
                    <label>Stock:</label>
                    <input value={detailData.stock || ""} onChange={e => handleChange(e)} name="stock" type="number"/>
                </div>

                 {/* <div>
                    <label>Imágenes:</label>
                    <input onChange={e => handleChange(e)} name="image1" type="text" placeholder="Imágen 1"/>
                    <input onChange={e => handleChange(e)} name="image2" type="text" placeholder="Imágen 2 (Opcional)"/>
                    <input onChange={e => handleChange(e)} name="image3" type="text" placeholder="Imágen 3 (Opcional)"/>
                    <input onChange={e => handleChange(e)} name="image4" type="text" placeholder="Imágen 4 (Opcional)"/>
                    {errors.image1 && (<p className={styles.error}>{errors.image1}</p>)}
                </div>  */}

                <div>
                    <label>Descuento:</label>
                    <input value={detailData.discount || ""} onChange={e => handleChange(e)} name="discount" type="number"/>
                </div>
                
                <div>
                    <label>Category:</label>
                    <select name="category" onChange={e => handleChange(e)}>
                        <option disabled selected>{product_detail.category}</option>
                        
                        {
                            categories && categories.filter(el => el.name !== firstCategory.category).map(el => {
                                    return <option value={el.id} key={el.id} >{el.name}</option>
                            })
                        }
                    </select>
                    
                </div>     

                <button type="submit">Enviar Producto</button>

            </form>
        </div>
        </div>
       
            
        
    );
}

const mapStateToProps = (state) => {
    return {
        product_detail: state.user.product_detail,
        categories: state.manageProducts.categories,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetailReset: () => dispatch(getProductDetailReset()),
        updateProduct: (detailData) => dispatch(updateProduct(detailData)),
        getCategories: () => dispatch(getCategories()),
        getProducts: () => dispatch(getProducts()),

    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(PutProduct);