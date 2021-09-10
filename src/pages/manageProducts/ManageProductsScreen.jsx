import React from 'react';
import styles from './ManageProductsScreen.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/manageProductsActions';
import ProductManageCard from '../../components/productManageCard/ProductManageCard';
import ReactPaginate from 'react-paginate'
import { getProductsByPage } from '../../redux/actions/userActions';

const ManageProductsScreen = ({products, getProductsByPage}) => {

  function changePage({selected}){
    getProductsByPage(selected+1)
}

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
            {products.products && products.products.map(el =>{
                return <ProductManageCard key={el.id} id={el.id} name={el.name} category={el.category} cost={el.cost}/>
            })}
        </div>
        <ReactPaginate
        previousLabel={<i className="fas fa-chevron-left"></i>}
        nextLabel={<i className="fas fa-chevron-right"></i>}
        pageCount={products.totalPage}
        onPageChange={changePage}
        activeClassName={'activePaginationBtn'}
        />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      products: state.products.products,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getProducts: () => dispatch(getProducts()),
      getProductsByPage: (num) => dispatch(getProductsByPage(num))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsScreen);
