import React from 'react';
import styles from './productManageCard.module.css'
import { getProducts } from '../../redux/actions/manageProductsActions';
import { connect } from 'react-redux';
import {deleteProduct} from '../../redux/actions/manageProductsActions'


const productManageCard = ({id, deleteProduct, getProducts, name, cost, category}) => {

    
         async function handleDelete() {
            
            await deleteProduct(id)
            await getProducts()
      
        }

    return (
        
         <div 
          className={styles.product} 
          >
          {id}. {name} ({category}) <b>${cost}</b><div className={styles.icons}><i onClick={handleDelete} className="fas fa-trash-alt fa-1x" ></i> <i className="fas fa-edit"></i></div>
        
     </div>
        
        
        
    );
}


  
  const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (id) => dispatch (deleteProduct(id)),
        getProducts: () => dispatch(getProducts())
    }
  }



export default connect(null, mapDispatchToProps)(productManageCard);






