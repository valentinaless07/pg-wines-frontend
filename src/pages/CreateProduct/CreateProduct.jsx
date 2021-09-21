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
        image: [],
        categoryId: "",
        sales: "0",
        brandId: "",
        packingId: "",

    })

    const [errors, setErrors] = useState({})
    

    function handleFileInput (e) {
        const files = e.target.files;
        
        let arrayFiles = [...files]
        
        
        
        setNewProductData({...newProductData, image: arrayFiles})
        
        
    }

   

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
            
            var bodyFormData = new FormData();
            for (const property in newProductData) {
                if(property !== "image"){
                bodyFormData.append(property, newProductData[property])
                }
                else{
                    for (let i = 0; i < newProductData[property].length; i++) {
                        
                        bodyFormData.append('image', newProductData[property][i]);                      
                    }
                }
              }
              postProductCreated(bodyFormData)
            setNewProductData({
                name: "",
                description: "",
                cost: "",
                capacity: "",
                discount: "0",
                stock: "0",
                image: [],
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

                <div className={styles.inputContainer}>
                    <label>Nombre:</label>
                    <input className={styles.input_text} value={newProductData.name} onChange={e => handleChange(e)} name="name" type="text"/>
                </div>    
                    {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                

                <div className={styles.inputContainer}>
                    <label>Descripción:</label>
                    <input className={styles.input_text} value={newProductData.description} onChange={e => handleChange(e)} name="description" type="text"/>
                </div>

                <div className={styles.inputContainer}>
                    <label>Precio:</label>
                    <input className={styles.input_text} value={newProductData.cost} onChange={e => handleChange(e)} name="cost" type="number"/>
                </div>
                    {errors.cost && (<p className={styles.error}>{errors.cost}</p>)}

                <div className={styles.inputContainer}>
                    <label>Capacidad (ml):</label>
                    <input className={styles.input_text} value={newProductData.capacity} onChange={e => handleChange(e)} name="capacity" type="number"/>
                </div>
                    {errors.capacity && (<p className={styles.error}>{errors.capacity}</p>)}

                <div className={styles.inputContainer}>
                    <label>Stock:</label>
                    <input className={styles.input_text} value={newProductData.stock} onChange={e => handleChange(e)} name="stock" type="number"/>
                </div>


                <div className={styles.inputContainer}>
                    <label>Descuento:</label>
                    <input className={styles.input_text} value={newProductData.discount} onChange={e => handleChange(e)} name="discount" type="number"/>
                </div>
                
                <div className={styles.select_container}>
                    <label>Categoría:</label>
                    <select className={styles.select} name="categoryId" onChange={e => handleChange(e)} defaultValue="Selecciona una categoría">
                    <option disabled>Selecciona una categoría</option>
                        {
                            manageProductState.categories && manageProductState.categories.map(el => {
                                    return <option value={el.id} key={el.id}>{el.name}</option>
                            })
                        }
                    </select>
                </div>
                    {errors.categoryId && (<p className={styles.error}>{errors.categoryId}</p>)}
                <div className={styles.select_container}>
                    <label>Marca:</label>
                    <select className={styles.select} name="brandId" onChange={e => handleChange(e)} defaultValue="Selecciona una marca">
                        <option disabled>Selecciona una marca</option>
                        {manageProductState.brands && manageProductState.brands.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                </div>
                    {errors.brandId && (<p className={styles.error}>{errors.brandId}</p>)}  
                <div className={styles.select_container}>
                    <label>Packing:</label>
                    <select className={styles.select} name="packingId" onChange={e => handleChange(e)} defaultValue="Selecciona un packing">
                        <option disabled>Selecciona un packing</option>
                        {manageProductState.packing && manageProductState.packing.map(el => {
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                        }
                    </select>
                </div>
                    {errors.packingId && (<p className={styles.error}>{errors.packingId}</p>)}    
                <div className={styles.images_container}>
                    <label>Imágenes del producto:</label>
                    <input className={styles.inputImage} type="file" multiple onChange={handleFileInput}></input>
                    
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