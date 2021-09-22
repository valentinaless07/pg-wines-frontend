import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from '../../components/productList/ProductsList.module.css';
import { getProductByName, getProductByNameReset } from '../../redux/actions/products';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { addCartProduct } from '../../redux/actions/cartActions';
import { deleteUserFavorite, getUserFavorites, postUserFavorite } from '../../redux/actions/manageProductsActions';
import Swal from 'sweetalert2'

const SearchResults = ({ product_detail, getProductByName, getProductByNameReset, addCartProduct, cart_state, postUserFavorite, authState, stateFavorites, getUserFavorites, deleteUserFavorite }) => {
    // console.log(getProductDetail);
    const { name } = useParams()
    const history = useHistory();


    useEffect(() => {
        // console.log(name);
        getProductByName(name)
        return () => { getProductByNameReset() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleGoToProducDescription(productId) {
        history.push(`/product/${productId}`);
    }

    async function addProductCart(item){
        
        if(cart_state?.findIndex(el => el.id === item.id) === -1){
            let detail = item
            detail.quantity = 1

        await addCartProduct(detail)

        
        }

        else{
             history.push("/cart")
        }

        
        }

        function isFavorite (id) {
        
            let favorite = stateFavorites.filter(el => el.id === id)
            
            if(favorite.length > 0){
                return true
            }
            return false
        }
        async function addFavorite (id) {
            if(isFavorite(id) === false){
                if(authState.uid === null){
                    Swal.fire('Debes ingresar para agregar a favoritos')
                }
            let data = {userId: authState.uid, idProduct: id}
            await postUserFavorite(data)
            await getUserFavorites(authState.uid)
            isFavorite(id)
            Swal.fire('Producto agregado a favoritos!')
            }
          else{
            await deleteUserFavorite({userId: authState.uid, idProduct: id})
            await getUserFavorites(authState.uid)
            isFavorite(id)
            await Swal.fire('Producto eliminado de favoritos!')
          }
          
    
        }


    return (
        <React.Fragment>
            <Navbar />
            <div className={`${styles.container}`}>
                <h2>Resultados para: {name}</h2>
                <div className={styles.productList}>

                    {product_detail.length > 0 ?

                        product_detail.map(item => {

                            return (
                                <div className={styles.productContainer} key={item.id}>
                                    <div className={styles.title}>
                                        <span>{item.name}</span>
                                        <button onClick={() => addFavorite(item.id)} className={`${styles.bnt} ${styles.bntFav} ${isFavorite(item.id) ? styles.favoriteActive : ""}`}><i className="fas fa-heart"></i></button>
                                    </div>
                                    <div className={styles.imgContainer} onClick={() => handleGoToProducDescription(item.id)} >
                                        <img className={styles.img} src={item.image[0]} alt='' />
                                    </div>
                                    <div className={styles.price}>
                                        {item.discount > 5 && <span>{item.discount}% Desc</span>}
                                        {item.discount > 5 ? <span className={styles.desc}>{'$ ' + ((item.cost) * (1 - (item.discount / 100))).toFixed(2)}</span> : <span>$ {item.cost}</span>}
                                    </div>
                                    <button onClick={() => addProductCart(item)} className={`${styles.bnt} ${styles.btnBuy}`}><i className="fas fa-shopping-cart"></i> COMPRAR</button>
                                </div>)
                        })
                        : <div className="notFoundWrapper">
                            <div>
                                <h2>Producto no encontrado</h2>
                                <img src="https://static.diariofemenino.com/uploads/psicologia/sonarcoparota1.jpg" alt="" />
                            </div>
                        </div>
                    }
                </div>

            </div>

            <Footer />
        </React.Fragment >

    );
}

function mapStateToProps(state) {
    return {
        product_detail: state.products.product_search,
        cart_state: state.cart.cartState,
        authState: state.auth,
        stateFavorites: state.manageProducts.favorites
    
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getProductByName: (product) => dispatch(getProductByName(product)),
        getProductByNameReset: () => dispatch(getProductByNameReset()),
        addCartProduct: (item) => dispatch(addCartProduct(item)),
        postUserFavorite: (data) => dispatch(postUserFavorite(data)),
        getUserFavorites: (userId) => dispatch(getUserFavorites(userId)),
        deleteUserFavorite: (datos) => dispatch(deleteUserFavorite(datos))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
