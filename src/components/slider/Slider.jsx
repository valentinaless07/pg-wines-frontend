import uniqid from 'uniqid';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getOffers, } from '../../redux/actions/offersManagerActions.js';
import { getFilteredProductsList } from '../../redux/actions/userActions';
import main_image from '../../assests/images/slider_1.png'
import './Slider.css';


const Slider = ({ width = '100%', getOffers, offersState, getFilteredProductsList }) => {

    const offers = offersState.offers;
    const [status, setStatus] = useState(false);
    const [carouselIsVisible, setCarouselIsVisible] = useState(true);
    const [values, setValues] = useState({
        categoryId: '',
        initPrice: '',
        finalPrice: '',
    });


    useEffect(() => {
        getOffers();
    }, [getOffers]);


    const handleClickItem = (idx) => {
        if (offers && idx > 0) {

            const visiblesOffers = offers.filter(offer => offer.status === true);
            const currentOffer = visiblesOffers[idx - 1];
            const categoryId = currentOffer.categoryId;

            setValues({
                ...values,
                categoryId: categoryId
            });
            console.log(values)
            setStatus(true);
            getFilteredProductsList(values);
            
            if(status){
             window.scrollTo(0,570);        
            }
            // setCarouselIsVisible(false);
        }
          

    }

    return (
        (carouselIsVisible) &&
        <div>
            <Carousel infiniteLoop={true} interval={1} autoplay={true} showThumbs={false} transitionTime={2000} width={width} onClickItem={handleClickItem} >
                <div key={uniqid()} className="image">
                    <img src={main_image} alt="Imagen pricipal" />
                </div>
                {
                    offers.filter(offer => offer.status).map(offer => (
                        <div key={uniqid()} className="image">
                            <img src={offer.image} alt="" />
                        </div>
                    ))
                }
            </Carousel>
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
        getFilteredProductsList: (values) => dispatch(getFilteredProductsList((values)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);

