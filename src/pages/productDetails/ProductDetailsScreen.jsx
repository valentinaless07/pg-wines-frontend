import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './ProductDetailsScreen.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { getProductDetail, getProductDetailReset } from '../../redux/actions/productDetailsActions';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { addCartProduct} from '../../redux/actions/cartActions';
import { useHistory } from 'react-router';
import Comments from '../../components/comments/Comments';



const ProductDetailsScreen = ({ product_detail, getProductDetail, getProductDetailReset, addCartProduct, cart_state}) => {
    // console.log(getProductDetail);
    const { id } = useParams()
    const [productId, setProductId] = useState()
    useEffect(() => {
        getProductDetail(id)
        setProductId(id)
        return () => { getProductDetailReset() }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id])

      console.log(productId)

      const prueba =[{
          id: 1,
          points: 4,
          review: 'esto es un texto muy largo'
      }]

      const [cantidadItems, setCantidadItems] = useState(1)
      const history = useHistory()

      function selectChange(e) {
          let num = parseInt(e.target.value)
          setCantidadItems(num)
      }

      async function addProductCart(){
        if(cart_state?.findIndex(el => el.id === product_detail.id) === -1){
        let detail = product_detail
        detail.quantity = cantidadItems    
        await addCartProduct(detail)
        
        
        }
        else{
            history.push("/cart")
        }
      }

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
                          <p>${product_detail.cost}</p>
                    </div>
                    
                    <div className={styles.lineaProduct}></div>
                        <label htmlFor="" className={styles.labelCantidad}>Cantidad:</label>
                        <div className={styles.cartProductDetail}>
                            <input type="text" id="cantidad" onChange={e => selectChange(e)}  />    
                        <button onClick={addProductCart} className={styles.addProductButton}>Agregar al carrito</button>
                    </div>
                    <div>
                    <label htmlFor="" className={styles.labelStock}>Stock Disponible:{product_detail.stock}</label>
                    </div>
                </div>
            </div>
                {product_detail.reviews && <Comments idUser={'313c2407-b38f-438b-8732-8f0b8689c501'} newComment={true} comments={product_detail.reviews} idProduct={productId}/>}
            <Footer />
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
      product_detail: state.products.product_detail,
      cart_state: state.cart.cartState
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        getProductDetail: (product) => dispatch(getProductDetail(product)),
        getProductDetailReset: () => dispatch(getProductDetailReset()),
        addCartProduct: (id) => dispatch(addCartProduct(id)),
        
        

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);
