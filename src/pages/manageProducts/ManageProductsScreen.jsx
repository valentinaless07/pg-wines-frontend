import React from 'react';
import styles from './ManageProductsScreen.module.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductsPagination } from '../../redux/actions/manageProductsActions';
import ProductManageCard from '../../components/productManageCard/ProductManageCard';
import ReactPaginate from 'react-paginate'
import { getProductsPage } from '../../redux/actions/manageProductsActions';
import { useEffect } from 'react';
import AdminAreaNavbar from "../../components/adminAreaNavbar/AdminAreaNavbar"

const ManageProductsScreen = ({products, getProductsPage, getProductsPagination}) => {

  useEffect(() => {
    getProductsPagination()
} , [getProductsPagination]);

  function changePage({selected}){
    getProductsPage(selected+1)
}

    return (
        <div className={styles.manageProductsContainer}>
        
        <AdminAreaNavbar/>


        {/* <div className={styles.createProductIcon}><NavLink to="createproduct"><li>Crear producto</li></NavLink></div> */}

        <div className={styles.productsList}>

          <div className={styles.h1_buttonCreate}> 
          <div className={styles.h1_container}><h1>Lista de Productos</h1></div> 
          <div className={styles.createProduct_container}>
          <Link to="createproduct"><b className={styles.createProductText}>Crear Producto</b></Link>
          </div>
          </div>
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
