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
import { getProductsPagination } from '../../redux/actions/manageProductsActions';
import { getBrands } from '../../redux/actions/manageProductsActions';
import { getPacking } from '../../redux/actions/manageProductsActions';


const PutProduct = ({updateProduct, getProductDetailReset, product_detail, manageProductsState, getCategories, getBrands, getPacking}) => {
    
    let history = useHistory()

   

    useEffect(() => {
        getCategories()
        getBrands()
        getPacking()
    } , []);

       
    const [firstCategory, setFirstCategory] = useState({category: product_detail.category})
    const [firstBrand, setFirstBrand] = useState({brand: product_detail.brand})
    const [firstPacking, setFirstPacking] = useState({packing: product_detail.packing})
    const [detailData, setDetailData] = useState(
        {
            id: product_detail.id,
            name: product_detail.name,
            description: product_detail.description,
            cost: product_detail.cost,
            capacity: product_detail.capacity,
            stock: product_detail.stock,
            discount: product_detail.discount,
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
            let categId = detailData.categoryId
            let brandId = detailData.brandId
            let packId = detailData.packingId

            detailData.categoryId.id === firstCategory.category.id ? categId = manageProductsState.categories.find(el => el.id === firstCategory.category.id).id : categId = detailData.categoryId
            detailData.brandId.id === firstBrand.brand.id ? brandId = manageProductsState.brands.find(el => el.id === firstBrand.brand.id).id : brandId = detailData.brandId
            detailData.packingId.id === firstPacking.packing.id ? packId = manageProductsState.packing.find(el => el.id === firstPacking.packing.id).id : packId = detailData.packingId
            
                    
           setDetailData(
               {
                   ...detailData,
                   packingId: packId,
                   categoryId: categId,
                   brandId: brandId
               }
           )

            
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
                    <select name="categoryId" onChange={e => handleChange(e)}>
                        <option disabled selected>{detailData.categoryId.name}</option>
                        
                        {
                            manageProductsState.categories && manageProductsState.categories.map(el => {
                                    return <option value={el.id} key={el.id} >{el.name}</option>
                            })
                        }
                    </select>
                    
                </div>
                <div>
                    <label>Marca:</label>
                    <select name="brandId" onChange={e => handleChange(e)}>
                        <option disabled selected>{detailData.brandId.name}</option>
                        {manageProductsState.brands && manageProductsState.brands.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                    {errors.brandId && (<p className={styles.error}>{errors.brandId}</p>)}  
                </div>
                <div>
                    <label>Packing:</label>
                    <select name="packingId" onChange={e => handleChange(e)}>
                        <option disabled selected>{detailData.packingId.name}</option>
                        {manageProductsState.packing && manageProductsState.packing.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                    {errors.packingId && (<p className={styles.error}>{errors.packingId}</p>)}    
                </div>     

                <button type="submit">Enviar Producto</button>

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