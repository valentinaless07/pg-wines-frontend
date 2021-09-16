import React, { useState } from 'react'
import BrandsAndCategories from '../../components/brands/Brands'
import styles from './manage.module.css'

export default function ManageProductInf(){
    
    const [element, setElement] = useState({
        active: 'categories'
    })

    function handleManage(manage){
        if(manage!==element.active){
            setElement({
                ...element,
                active: manage
            })            
        }
    }

    return(
        <div>
            <div className={styles.btns}>
                <div className={`${styles.btn__Selection} ${element.active==='categories' && styles.active__Selection}`} onClick={()=>handleManage('categories')}>
                    <i className={`fas fa-wine-bottle ${styles.icon}`}></i>
                    <span>Agregar Categoria</span>
                </div>
                <div className={`${styles.btn__Selection} ${element.active==='brands' && styles.active__Selection}`} onClick={()=>handleManage('brands')} >
                    <i className={`fab fa-penny-arcade ${styles.icon}`}></i>
                    <span>Agregar Marca</span>
                </div>
            </div>
            <BrandsAndCategories element={element.active}/>

        </div>
    )
}