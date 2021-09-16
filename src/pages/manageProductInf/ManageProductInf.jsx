import React, { useState } from 'react'
import BrandsAndCategories from '../../components/brands/Brands'

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
            <div onClick={()=>handleManage('categories')}>
                <i className="fas fa-wine-bottle"></i>
                <span>Agregar nueva categoria</span>
            </div>
            <div onClick={()=>handleManage('brands')} >
                <i className="fab fa-penny-arcade"></i>
                <span>Agregar marca de producto</span>
            </div>
            {
                <BrandsAndCategories element={element.active}/>
            }

        </div>
    )
}