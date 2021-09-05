import React from 'react';
import styles from './ManageProductsScreen.module.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ManageProductsScreen = () => {

    const [newProductData, setNewProductData] = useState({
        name: "",
        description: "",
        cost: "",
        capacity: "",
        discount: "",
        stock: "",
        image1: "",
        image2: "",
        image3: "",
        image4: ""
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

        // else if(!input.image1){
        //     errors.image1 = "Ingrese al menos una imagen"
        // }

        return errors

    }

    return (
        <div>
        <nav>
            <ul className={styles.nav}>
                <NavLink to="/home"><li>Volver a la página de inicio</li></NavLink>
                <li>Lista de productos</li>
                <li>Crear producto</li>
            </ul>
        </nav>
        <div className={styles.container}>
            <h1>Crear nuevo producto</h1>
            <form className={styles.form}>

                <div>
                    <label>Nombre:</label>
                    <input onChange={e => handleChange(e)} name="name" type="text"/>
                    {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                </div>

                <div>
                    <label>Descripción:</label>
                    <input onChange={e => handleChange(e)} name="description" type="text"/>
                </div>

                <div>
                    <label>Precio:</label>
                    <input onChange={e => handleChange(e)} name="cost" type="number"/>
                    {errors.cost && (<p className={styles.error}>{errors.cost}</p>)}
                </div>

                <div>
                    <label>Capacidad (ml):</label>
                    <input onChange={e => handleChange(e)} name="capacity" type="number"/>
                    {errors.capacity && (<p className={styles.error}>{errors.capacity}</p>)}
                </div>

                <div>
                    <label>Stock:</label>
                    <input onChange={e => handleChange(e)} name="stock" type="number"/>
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
                    <input onChange={e => handleChange(e)} name="discount" type="number"/>
                </div>
                
                <div>
                    <label>Category:</label>
                    <select/>
                </div>    

                <button type="submit">Crear Producto</button>

            </form>
        </div>
        </div>
    );
}

export default ManageProductsScreen;
