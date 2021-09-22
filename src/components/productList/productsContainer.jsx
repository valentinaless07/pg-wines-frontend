import styles from './ProductsList.module.css';
import './productList.css'
import { useHistory, useLocation } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux';
import { getProductsByPage } from '../../redux/actions/userActions';
import './productList.css'
import { addCartProduct } from '../../redux/actions/cartActions';
import { editItemsAmount } from '../../redux/actions/cartActions';
import noFound from '../../assests/images/noFound.png'
import ScrollUp from '../scrollUp/ScrollUp';
import { deleteUserFavorite, postUserFavorite } from '../../redux/actions/manageProductsActions';
import { getUserFavorites } from '../../redux/actions/manageProductsActions';
import Swal from 'sweetalert2'


function ProductsContainer({ state, getProductsByPage, cart_state, addCartProduct, editItemsAmount, postUserFavorite, authState, stateFavorites, getUserFavorites, deleteUserFavorite }) {

    let { search } = useLocation();
    var query = new URLSearchParams(search)
    const history = useHistory();

    function handleGoToProducDescription(productId) {
        history.push(`/product/${productId}`);
    }

    async function addProductCart(item) {

        if (cart_state?.findIndex(el => el.id === item.id) === -1) {
            let detail = item
            detail.quantity = 1

            await addCartProduct(detail)
            
        }

        else {
            history.push("/cart")
        }


    }

    function changePage({ selected }) {
        let category = query.get('category') || ''
        let initPrice = query.get('initPrice') || ''
        let finalPrice = query.get('finalPrice') || ''
        let page = selected + 1
        getProductsByPage(category, initPrice, finalPrice, page)
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

    return (<div id='containerProducts' className={`${styles.container}`}>
        <ScrollUp />
        <ReactPaginate
            previousLabel={<i className="fas fa-chevron-left"></i>}
            nextLabel={<i className="fas fa-chevron-right"></i>}
            pageCount={state.totalPage}
            onPageChange={changePage}
            activeClassName={'activePaginationBtn'}
            initialPage={0}
        />
        <div className={styles.productList}>
            {
                state.products.length > 0 ? state.products.map(item => {
                    return <div key={item.id} className={styles.productContainer}>
                            <div className={styles.title}>
                                <span>{item.name}</span>
                                <button onClick={() => addFavorite(item.id)} className={`${styles.bnt} ${styles.bntFav} ${isFavorite(item.id) ? styles.favoriteActive : ""}`}><i className="fas fa-heart"></i></button>
                            </div>
                            <div className={styles.imgContainer}>
                                <img onClick={() => handleGoToProducDescription(item.id)} className={styles.img} src={item.image} alt='' />
                            </div>
                            <div className={styles.price}>
                                {item.discount > 0 && <span>{item.discount}% Desc</span>}
                                {item.discount > 0 ? <span className={styles.desc}>{'$ ' + ((item.cost) * (1 - (item.discount / 100))).toFixed(2)}</span> : <span>$ {item.cost}</span>}
                            </div>
                            {item.stock === 0 ?
                                <button className={`${styles.bnt} ${styles.btnBuy} ${styles.noStock}`}>Sin Stock</button>
                                :
                                <button onClick={() => addProductCart(item)} className={`${styles.bnt} ${styles.btnBuy}`}><i className="fas fa-shopping-cart"></i> COMPRAR</button>
                            }
                        </div>
                })
                    :
                    <div >
                        <img className={styles.noFound} src={noFound} alt="noFound" />
                        <h1>PERDÓN, NO ENCONTRAMOS LO QUE BUSCABAS</h1>
                    </div>
            }
        </div>
        <ReactPaginate
            previousLabel={<i className="fas fa-chevron-left"></i>}
            nextLabel={<i className="fas fa-chevron-right"></i>}
            pageCount={state.totalPage}
            onPageChange={changePage}
            activeClassName={'activePaginationBtn'}
            initialPage={0}
        />
    </div>)
}

function mapStateToProps(state) {
    return {
        product_detail: state.user.product_detail,
        cart_state: state.cart.cartState,
        authState: state.auth,
        stateFavorites: state.manageProducts.favorites
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addCartProduct: (id) => dispatch(addCartProduct(id)),
        getProductsByPage: (category, initPrice, finalPrice, page) => dispatch(getProductsByPage(category, initPrice, finalPrice, page)),
        editItemsAmount: (amount) => dispatch(editItemsAmount(amount)),
        postUserFavorite: (data) => dispatch(postUserFavorite(data)),
        getUserFavorites: (userId) => dispatch(getUserFavorites(userId)),
        deleteUserFavorite: (datos) => dispatch(deleteUserFavorite(datos))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
