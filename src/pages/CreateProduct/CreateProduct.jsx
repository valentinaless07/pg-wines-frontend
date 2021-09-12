import React from 'react';
import styles from './CreateProduct.module.css'
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getCategories, postProductCreated} from '../../redux/actions/manageProductsActions'
import Swal from 'sweetalert2'
import { getBrands } from '../../redux/actions/manageProductsActions';
import { getPacking } from '../../redux/actions/manageProductsActions';
import { useHistory } from 'react-router';

const CreateProduct = ({ manageProductState, getCategories, postProductCreated, getBrands, getPacking}) => {


    useEffect(() => {
        getCategories()
        getBrands()
        getPacking()
    } , [getCategories, getBrands, getPacking]);

    const history = useHistory()

    const [newProductData, setNewProductData] = useState({

        name: "",
        description: "",
        cost: "",
        capacity: "",
        discount: "0",
        stock: "0",
        image: ["01_1605539265"],
        categoryId: "",
        sales: "0",
        brandId: "",
        packingId: ""
    })

    const [errors, setErrors] = useState({})


    function handleChange (e) {
        setNewProductData({
            ...newProductData,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
            ...newProductData,
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
        
        else if(!input.categoryId){
            errors.categoryId = "Ingrese una categoría"
        }

        else if(!input.brandId){
            errors.brandId = "Ingrese una marca"
        }

        else if(!input.packingId){
            errors.packingId = "Ingrese un packing"
        }

        

        return errors

    }

    function handleSubmit (e) {
        e.preventDefault()
        
        let validateSubmit = validate(newProductData)
        
        if(Object.keys(validateSubmit).length === 0){
            
            postProductCreated(newProductData)
            setNewProductData({
                name: "",
                description: "",
                cost: "",
                capacity: "",
                discount: "0",
                stock: "0",
                image: ["01_1605539265"],
                categoryId: "",
                sales: "0",
                brandId: "",
                packingId: ""
            })
            Swal.fire('Producto Creado')
            history.push("/manageProducts")
        }
        else{
            Swal.fire('Completar todos los campos requeridos')
        }
        
    }


    return (
        <div className={styles.createProduct}>

        
        <Link to="/manageProducts" className={styles.backIcon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>
        

        <div className={styles.container}>
            <h1>Crear nuevo producto</h1>
            <div className={styles.container_form}>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>

                <div>
                    <label>Nombre:</label>
                    <input value={newProductData.name} onChange={e => handleChange(e)} name="name" type="text"/>
                    {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                </div>

                <div>
                    <label>Descripción:</label>
                    <input value={newProductData.description} onChange={e => handleChange(e)} name="description" type="text"/>
                </div>

                <div>
                    <label>Precio:</label>
                    <input value={newProductData.cost} onChange={e => handleChange(e)} name="cost" type="number"/>
                    {errors.cost && (<p className={styles.error}>{errors.cost}</p>)}
                </div>

                <div>
                    <label>Capacidad (ml):</label>
                    <input value={newProductData.capacity} onChange={e => handleChange(e)} name="capacity" type="number"/>
                    {errors.capacity && (<p className={styles.error}>{errors.capacity}</p>)}
                </div>

                <div>
                    <label>Stock:</label>
                    <input value={newProductData.stock} onChange={e => handleChange(e)} name="stock" type="number"/>
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
                    <input value={newProductData.discount} onChange={e => handleChange(e)} name="discount" type="number"/>
                </div>
                
                <div>
                    <label>Categoría:</label>
                    <select name="categoryId" onChange={e => handleChange(e)} defaultValue="Selecciona una categoría">
                    <option disabled>Selecciona una categoría</option>
                        {
                            manageProductState.categories && manageProductState.categories.map(el => {
                                    return <option value={el.id} key={el.id}>{el.name}</option>
                            })
                        }
                    </select>
                    {errors.categoryId && (<p className={styles.error}>{errors.categoryId}</p>)}
                </div>
                <div>
                    <label>Marca:</label>
                    <select name="brandId" onChange={e => handleChange(e)} defaultValue="Selecciona una marca">
                        <option disabled>Selecciona una marca</option>
                        {manageProductState.brands && manageProductState.brands.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                    {errors.brandId && (<p className={styles.error}>{errors.brandId}</p>)}  
                </div>
                <div>
                    <label>Packing:</label>
                    <select name="packingId" onChange={e => handleChange(e)} defaultValue="Selecciona un packing">
                        <option disabled>Selecciona un packing</option>
                        {manageProductState.packing && manageProductState.packing.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                    {errors.packingId && (<p className={styles.error}>{errors.packingId}</p>)}    
                </div>        

                <button className={styles.buttonSubmitForm} type="submit">Crear Producto</button>

            </form>
            </div>
        </div>
        </div>
        
    );
}

const mapStateToProps = (state) => {
    return {
      manageProductState: state.manageProducts,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getCategories: () => dispatch(getCategories()),
      postProductCreated: (newProductData) => dispatch( postProductCreated(newProductData)),
      getBrands: () => dispatch(getBrands()),
      getPacking: () => dispatch(getPacking())  
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);