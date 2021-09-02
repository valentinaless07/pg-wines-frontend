// import React from 'react';
// import ReactDOM from 'react-dom';

// import styles from './Slider.module.css';
// import './Slider.css';

import slider_1 from '../../assests/images/slider/slider_1.png';
import slider_2 from '../../assests/images/slider/slider_2.png';
import slider_3 from '../../assests/images/slider/slider_3.png';
import slider_4 from '../../assests/images/slider/slider_4.png';
import slider_5 from '../../assests/images/slider/slider_5.png';
import slider_6 from '../../assests/images/slider/slider_6.png';
import slider_7 from '../../assests/images/slider/slider_7.png';
import slider_8 from '../../assests/images/slider/slider_8.png';
import slider_9 from '../../assests/images/slider/slider_9.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import styles from './Slider.module.css';
import './Slider1.css';


const Slider1 = () => {
    // proof
    return (
        <div>
            <Carousel infiniteLoop autoplay showThumbs={false} width={'100%'} >
                <div className="image">
                    <img src={slider_1} alt="wine13" />
                </div>
                <div className="image">
                    <img src={slider_2} alt="wine14" />
                </div>
                <div className="image">
                    <img src={slider_3} alt="wine15" />
                </div>
                <div className="image">
                    <img src={slider_4} alt="wine15" />
                </div>
                <div className="image">
                    <img src={slider_5} alt="wine15" />
                </div>
                <div className="image">
                    <img src={slider_6} alt="wine15" />
                </div>
                <div className="image">
                    <img src={slider_7} alt="wine15" />
                </div>
                <div className="image">
                    <img src={slider_8} alt="wine15" />
                </div>
                <div className="image">
                    <img src={slider_9} alt="wine15" />
                </div>
            </Carousel>
        </div>
    )
    // return (
    //     <div>
    //         <Carousel infiniteLoop autoplay showThumbs={false} width={'100%'} >
    //             <div className={styles.image}>
    //                 <img src={wine_1} alt="wine13" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_2} alt="wine14" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_3} alt="wine15" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_4} alt="wine15" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_5} alt="wine15" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_6} alt="wine15" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_7} alt="wine15" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_8} alt="wine15" />
    //             </div>
    //             <div className={styles.image}>
    //                 <img src={wine_9} alt="wine15" />
    //             </div>
    //         </Carousel>
    //     </div>
    // )
}

export default Slider1;
