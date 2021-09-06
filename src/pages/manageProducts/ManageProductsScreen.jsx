import React, { useEffect } from 'react';
import styles from './ManageProductsScreen.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/manageProductsActions';
import ProductManageCard from '../../components/productManageCard/ProductManageCard';



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
                return <ProductManageCard key={el.id} id={el.id} name={el.name} category={el.category} cost={el.cost}/>
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
