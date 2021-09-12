import React from 'react';
import styles from './ManageProductsScreen.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductsPagination } from '../../redux/actions/manageProductsActions';
import ProductManageCard from '../../components/productManageCard/ProductManageCard';
import ReactPaginate from 'react-paginate'
import { getProductsPage } from '../../redux/actions/manageProductsActions';
import { useEffect } from 'react';

const ManageProductsScreen = ({products, getProductsPage, getProductsPagination}) => {

  useEffect(() => {
    getProductsPagination()
} , []);

  function changePage({selected}){
    getProductsPage(selected+1)
}

    return (
        <div className={styles.manageProductsContainer}>
        <nav>
          <div className={styles.backIcon}><NavLink to="/"><i className="fas fa-arrow-circle-left fa-3x"></i></NavLink></div>
            <ul className={styles.nav}>
                
                <div className={styles.createProductIcon}><NavLink to="createproduct"><li>Crear producto</li></NavLink></div>
                
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
      products: state.manageProducts.products,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getProductsPagination: () => dispatch(getProductsPagination()),
      getProductsPage: (num) => dispatch(getProductsPage(num))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsScreen);
