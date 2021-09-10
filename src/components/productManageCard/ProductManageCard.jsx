import React from 'react';
import styles from './productManageCard.module.css'
import { getProducts } from '../../redux/actions/manageProductsActions';
import { connect } from 'react-redux';
import {deleteProduct} from '../../redux/actions/manageProductsActions'
import { useHistory } from "react-router-dom";
import { getProductDetail} from '../../redux/actions/productDetailsActions';
import Swal from 'sweetalert2'

const ProductManageCard = ({getProductDetail, id, deleteProduct, getProducts, name, cost, category}) => {

  let history = useHistory()

    
         async function handleDelete() {
          // const respuesta = await Swal.fire({
          //   title: '¿Estás seguro que quieres eliminar este producto?',
          //   icon: 'warning',
          //   showCancelButton: true,
          //   confirmButtonText: 'Si',
          //   cancelButtonText: 'No'
          // })
          
          //   if (respuesta.isConfirmed) {
          //     await deleteProduct(id)
          //     await getProducts()
          //     Swal.fire(
          //       'Producto Eliminado!',
          //       '',
          //       'success'
          //     )
            
          //   } 
          
      
        }

        async function handlePut() {
          // await getProductDetail(id)
          // history.push('/update/'+id)
        }

    return (
        
         <div 
          className={styles.product} 
          >
          {name} () <b>${cost}</b><div className={styles.icons}><i onClick={handleDelete} className="fas fa-trash-alt fa-1x" ></i> <i onClick={handlePut} className="fas fa-edit"></i></div>
        
     </div>
        
        
        
    );
}


  
  const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (id) => dispatch (deleteProduct(id)),
        getProducts: () => dispatch(getProducts()),
        getProductDetail: (id) => dispatch(getProductDetail(id)),
        
    }
  }



export default connect(null, mapDispatchToProps)(ProductManageCard);






