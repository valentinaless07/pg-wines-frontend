import React, { useEffect } from 'react';
import styles from './ManageProductsScreen.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/manageProductsActions';



const ManageProductsScreen = ({productState, getProducts}) => {

    

    useEffect(() => {
        getProducts()
    } , [getProducts]);

    return (
        <div className={styles.manageProductsContainer}>
        <nav>
            <ul className={styles.nav}>
                <NavLink to="/home"><li>Volver a la página de inicio</li></NavLink>
                <NavLink to="createproduct"><li>Crear producto</li></NavLink>
                
            </ul>
        </nav>

        <div className={styles.productsList}>
            <h1>Productos:</h1>
            {productState && productState.map(el =>{
                return <div className={styles.product} key={el.id}>{el.id}. {el.name} ({el.category}) <b>${el.cost}</b><div className={styles.icons}><i className="fas fa-trash-alt fa-1x" ></i> <i className="fas fa-edit"></i></div></div>
            })}
        </div>
        
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      productState: state.manageProducts.products,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getProducts: () => dispatch(getProducts())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsScreen);
