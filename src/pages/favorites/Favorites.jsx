import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import styles from './Favorites.module.css';
import { deleteUserFavorite, getUserFavorites } from '../../redux/actions/manageProductsActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';



const Favorites = ({getUserFavorites, authState, stateFavorites, deleteUserFavorite}) => {
    const history = useHistory()
    useEffect(() => {
        
        getUserFavorites(authState.uid)
        
    } , [getUserFavorites]);

    async function deleteFavorite (id) {
      deleteUserFavorite({userId: authState.uid, idProduct: id})

      await Swal.fire('Producto eliminado de favoritos!')
      history.go(0)

    }
    
    
    return (
        <>
            <Navbar />
            <div className={styles.container}>
              <div className={styles.h1_container}>
                <h1>Mis Favoritos </h1>
                </div>  
                <div className={styles.products_container}>
                  {stateFavorites.map(el => 
                  <div key={el.id} className={styles.product_container}>
                    <div className={styles.img_container}>
                    <img src={el.image[0]} alt="" />
                    </div>
                    <div className={styles.name_container}> 
                    <h5 className={styles.name}>{el.name}</h5>
                    </div>
                    <p>${el.cost}</p>
                    <div className={styles.icon_container}>
                    <i onClick={() => deleteFavorite(el.id)} className="fas fa-heart fa-3x"></i>
                    </div>
                    <p onClick={() => history.push(`/product/${el.id}`)} className={styles.buyButton}>Comprar Producto</p>

                  </div>)
                  
                  }
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
      authState: state.auth,
      stateFavorites: state.manageProducts.favorites

    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getUserFavorites: (idUser) => dispatch(getUserFavorites(idUser)),
      deleteUserFavorite: (data) => dispatch(deleteUserFavorite(data))
      
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);