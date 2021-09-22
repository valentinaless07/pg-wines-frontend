import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getInfo, createElement, deleteElement, updateElement } from "../../redux/actions/brandsAndCategories"
import Swal from "sweetalert2"
import styles from './Packing.module.css'
import { useLocation } from "react-router"
import AdminAreaNavbar from "../../components/adminAreaNavbar/AdminAreaNavbar"
import { getPacking } from "../../redux/actions/manageProductsActions"


function Packing({getPacking, packing}){
    
    

    
    
    
    
    useEffect(()=>{
        getPacking()
    },[getPacking])
    
  


    


   
         

      
    return(
    <React.Fragment>
            <AdminAreaNavbar/>
        <div className={styles.admin}>

        <h1>Packing</h1>
        
            
            <button className={styles.btnCreate}>{`CREAR`}</button>
        
        <div className={styles.infoContainer}>
                {
                    packing.length > 0 ? packing.map(item=><div className={styles.optionsContainer} key={item.id}>
                            <div>
                                <span>{item.name}</span>
                            </div>
                            <div>
                                <span className={styles.icon} ><i className="far fa-trash-alt"></i></span>
                                <span className={styles.icon} ><i className="fas fa-feather-alt"></i></span>
                            </div>
                        </div>)
                    :
                    <h1>Cargando...</h1>
                }
        </div>

    </div>
    </React.Fragment>)
}

const mapStateToProps = (state) => {
    return {
      packing: state.manageProducts.packing,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
      getPacking: () => dispatch(getPacking())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Packing)