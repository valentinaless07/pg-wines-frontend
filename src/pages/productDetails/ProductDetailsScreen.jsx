import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './ProductDetailsScreen.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { getProductDetail, getProductDetailReset } from "../../redux/actions/productDetailsActions";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const ProductDetailsScreen = ({ product_detail, getProductDetail, getProductDetailReset}) => {
    console.log('PD', product_detail);
    const { id } = useParams()
    useEffect(() => {
        getProductDetail(id)
        return () => { getProductDetailReset() }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.mainImage}>
                    <img src={product_detail.image} alt="gin" />
                </div>
                <div className={styles.detailProduct}>
                    <h1>{product_detail.name}</h1>
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <FontAwesomeIcon className={styles.detailProductIcon} icon={faWineGlass} />
                    <br />
                    <br />
                    <hr />
                    <div className={styles.description}>
                        {product_detail.description}
                          <p>{product_detail.price}</p>
                    </div>
                    <div className={styles.lineaProduct}></div>
                        <label htmlFor="" className={styles.labelCantidad}>Cantidad:</label>
                        <div className={styles.cartProductDetail}>
                        <select name="cantidad" id="cantidad">
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
                        <button>Add to Cart</button>
                    </div>

                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
      product_detail: state.product_detail,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        getProductDetail: (product) => dispatch(getProductDetail(product)),
        getProductDetailReset: () => dispatch(getProductDetailReset())

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);
