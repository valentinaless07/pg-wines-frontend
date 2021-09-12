import uniqid from 'uniqid';
import { connect } from 'react-redux';
import React from 'react';
import { getOffers, deleteOfferById, updateOfferById } from '../../redux/actions/offersManagerActions';
import styles from './OfferItem.module.css';


const OfferItem = ({ offer, offersState, authState, deleteOfferById, updateOfferById }) => {
    // const offers = offersState.offers;

    const handleDelete = (id) => {
        console.log('delete item', id);
        deleteOfferById(id);
    }
    const handleChangeStatus = (id, status) => {
        console.log('status item', { id, currentStatus: status, changeStatus: !status });
        updateOfferById(id, !status);
    }

    return (
       
        <div key={uniqid()} className={styles.cart_product}>
            <div className={styles.img_container}>
                <img src={offer.image} alt="" />
            </div>
            <div className={styles.name_price_product}>
                <span>{offer.image}</span>
           
                <span className={styles.product_name}>{offer.slug}</span>
            </div>

            <div className={styles.icons_container}>
                {
                    (offer.status)
                        ? <i onClick={(id) => handleChangeStatus(offer.id, offer.status)} className="fas fa-eye fa-2x" ></i>
                        : <i onClick={(id) => handleChangeStatus(offer.id, offer.status)} className="fas fa-eye-slash fa-2x" ></i>
                }
                <i onClick={(id) => handleDelete(offer.id)} className="fas fa-trash-alt fa-2x" ></i>
            </div>
        </div>       

    )
}
const mapStateToProps = (state) => {
    return {
        offersState: state.offers,
        authState: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOffers: () => dispatch(getOffers()),
        deleteOfferById: (id) => dispatch(deleteOfferById(id)),
        updateOfferById: (id, status) => dispatch(updateOfferById(id, status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferItem);


