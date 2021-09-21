import uniqid from 'uniqid';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
// import sliderData from '../../data/slider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getOffers, } from '../../redux/actions/offersManagerActions.js';
import './Slider1.css';
// const sliderImages = require.context('../../assests/images/slider', true);

const Slider1 = ({ data, from = 0, to = 0, width = '100%', getOffers, offersState }) => {
    const history = useHistory();
    const offers = offersState.offers;

    useEffect(() => {
        getOffers();
    }, [getOffers]);

    const handleClickItem = (idx)=> {
        if(offers){    
            console.log(offers)        
            const visiblesOffers = offers.filter(offer=>offer.status === true);
            const currentOffer = visiblesOffers[idx];
            const productId = currentOffer.productId;
            
            history.push(`/product/${productId}`);            
        }      
    }

    return (
        <div>
            <Carousel infiniteLoop={true} interval={1} autoplay={true} showThumbs={false} transitionTime={2000} width={width} onClickItem={handleClickItem} >
                {
                    offers.filter(offer => offer.status).map(offer => (
                        <div key={uniqid()} className="image">
                            <img src={offer.image} alt="" />                            
                        </div>
                    ))
                    // sliderData.filter(({ _ }, idx) => idx >= from && idx <= to).map(({ photo, caption, onClickGoTo }, idx) => (
                    //     <div key={uniqid()} className="image">
                    //         <img src={sliderImages(`./${photo}.png`).default} alt="" />
                    //     </div>
                    // ))
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider1);

