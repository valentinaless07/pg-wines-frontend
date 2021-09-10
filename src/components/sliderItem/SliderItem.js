import uniqid from 'uniqid';
import { connect } from 'react-redux';
import React from 'react';
import { getSliderImagesAction } from '../../redux/actions/sliderManagerActions';
import styles from './SliderItem.module.css';

// productId
// status
// image

const SliderItem = ({ sliderState, authState, getImages }) => {
    const sliderList = sliderState.sliderList;

    const handleDelete = (id) => {
        console.log('delete item', id);
    }
    const handleStatus = (productId) => {
        console.log('status item', productId);
        console.log(productId);
    }

    return (
        sliderList && sliderList.map(item => (
            <div key={uniqid()} className={styles.cart_product}>
                <div className={styles.img_container}>
                    <img src={item.image} alt="" />
                </div>
                <div className={styles.name_price_product}>
                    <span>{item.image}</span>
                </div>

                <div className={styles.icons_container}>
                    {
                        (item.status)
                            ? <i onClick={(id) => handleStatus(item.productId)} className="fas fa-eye fa-2x" ></i>
                            : <i onClick={(id) => handleStatus(item.productId)} className="fas fa-eye-slash fa-2x" ></i>
                    }
                    <i onClick={(id) => handleDelete(item.productId)} className="fas fa-trash-alt fa-2x" ></i>
            </div>
            </div >

            //     // <CartProduct image={el.image} name={el.name} cost={el.cost} id={el.id} itemsAmount={el.itemsAmount} />
        ))

    )
}
const mapStateToProps = (state) => {
    return {
        sliderState: state.slider,
        authState: state.auth,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImages: () => dispatch(getSliderImagesAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderItem);


