import styles  from './ProductsList.module.css';
import './productList.css'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux';
import { getProductsByPage } from '../../redux/actions/userActions';
import './productList.css'
import Swal from 'sweetalert2'
import { addCartProduct } from '../../redux/actions/cartActions';
import { editItemsAmount } from '../../redux/actions/cartActions';

function ProductsContainer({state, getProductsByPage, cart_state, addCartProduct, editItemsAmount}){
    
    const history = useHistory();

    function handleGoToProducDescription(productId){
        history.push(`/product/${productId}`);
    }

    function addProductCart(item){
        if(cart_state.findIndex(el => el.id === item.id) === -1){
        let detail = item
        detail.itemsAmount = 1

        addCartProduct(detail)
        
        }

        
        }

        function changePage({selected}){
            getProductsByPage(selected+1)
        }

    return(<div id='containerProducts' className={`${styles.container}`}>
        <div className={styles.productList}>
            {
                state.products.map(item=>{return<Link to='#' key={item.id}>
                    <div className={styles.productContainer}>
                        <div className={styles.title}>
                            <span>{item.name}</span>
                            <button className={`${styles.bnt} ${styles.bntFav}`}><i className="fas fa-heart"></i></button>
                        </div>
                            <div className={styles.imgContainer}>
                                <img onClick={()=>handleGoToProducDescription(item.id)} className={styles.img} src={item.image} alt=''/>
                            </div>
                            <div className={styles.price}>
                                {item.discount>5 && <span>{item.discount}% Desc</span>}
                                {item.discount>5 ? <span className={styles.desc}>{'$ '+((item.cost)*(1-(item.discount/100))).toFixed(2)}</span>:<span>$ {item.cost}</span>}
                            </div>
                            <button onClick={() => addProductCart(item)} className={`${styles.bnt} ${styles.btnBuy}`}><i className="fas fa-shopping-cart"></i> COMPRAR</button>
                    </div>
                </Link>})
            }
        </div>
        <ReactPaginate
        previousLabel={<i className="fas fa-chevron-left"></i>}
        nextLabel={<i className="fas fa-chevron-right"></i>}
        pageCount={state.totalPage}
        onPageChange={changePage}
        activeClassName={'activePaginationBtn'}
        />
    </div>)
}

function mapStateToProps(state) {
    return {
      product_detail: state.user.product_detail,
      cart_state: state.cart.cartState
    };
  };

  function mapDispatchToProps(dispatch) {
    return {
        addCartProduct: (id) => dispatch(addCartProduct(id)),
        getProductsByPage: (num) => dispatch(getProductsByPage(num)),
        editItemsAmount: (amount) => dispatch(editItemsAmount(amount))


    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
