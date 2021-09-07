import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './ProductDetailsScreen.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { getProductByName, getProductByNameReset } from '../../redux/actions/products';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { addCartProduct } from '../../redux/actions/cartActions';

const ProductByName = ({ product_detail, getProductByName, getProductByNameReset, addCartProduct}) => {
    // console.log(getProductDetail);
    const { name } = useParams()
    useEffect(() => {
        getProductByName(name)
        return () => { getProductByNameReset() }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const [cantidadItems, setCantidadItems] = useState(1)

      function selectChange(e) {
          setCantidadItems(e.target.value)
      }

      function addProductCart(){
         let detail = product_detail
         detail.cantidadItems = cantidadItems
        addCartProduct(detail)
      }

    return (
        <React.Fragment>
            <Navbar />
           {product_detail.length  > 0 ?
            <div className={styles.container}>
                <div className={styles.mainImage}>
                    <img src={product_detail[0].image} alt="gin" />
                </div>
                <div className={styles.detailProduct}>
                    <h1>{product_detail[0].name}</h1>
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <br />
                    <br />
                    <hr />
                    <div className={styles.description}>
                        {product_detail[0].description}
                          <p>${product_detail[0].cost}</p>
                    </div>
                    <div className={styles.lineaProduct}></div>
                        <label htmlFor="" className={styles.labelCantidad}>Cantidad:</label>
                        <div className={styles.cartProductDetail}>
                        <select name="cantidad" id="cantidad" onChange={e => selectChange(e)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>

                        </select>
                        <button onClick={addProductCart}>Agregar al carrito</button>
                    </div>

                </div>
            </div>
            : <div className="notFoundWrapper"> 
                    <h2>Pokemon not found</h2>
                </div> }
                
        <Footer />
        </React.Fragment>
        
    );
}

function mapStateToProps(state) {
    return {
      product_detail: state.products.product_search
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        getProductByName: (product) => dispatch(getProductByName(product)),
        getProductByNameReset: () => dispatch(getProductByNameReset()),
        addCartProduct: (id) => dispatch(addCartProduct(id)) 

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductByName);
