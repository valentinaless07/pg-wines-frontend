import React, { useState } from 'react'
import BrandsAndCategories from '../../components/brands/Brands'
import styles from './manage.module.css'
import { useHistory } from "react-router"

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

    const history = useHistory()

    function back(){
        history.push('/adminArea')
    }

    return(
        <div className={styles.manageInfoContainer}>
            <span onClick={back} className={styles.back}><i className="fas fa-arrow-circle-left"></i></span>
            <div className={styles.btns}>
                <div className={`${styles.btn__Selection} ${element.active==='categories' && styles.active__Selection}`} onClick={()=>handleManage('categories')}>
                    <i className={`fas fa-wine-bottle ${styles.icon}`}></i>
                    <span>Categorias</span>
                </div>
                <div className={`${styles.btn__Selection} ${element.active==='brands' && styles.active__Selection}`} onClick={()=>handleManage('brands')} >
                    <i className={`fab fa-penny-arcade ${styles.icon}`}></i>
                    <span>Marcas</span>
                </div>
            </div>
            <BrandsAndCategories element={element.active}/>

        </div>
    )
}