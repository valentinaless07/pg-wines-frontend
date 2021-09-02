// import React from 'react';
// import ReactDOM from 'react-dom';

// import styles from './Slider.module.css';
// import './Slider.css';

// import wine_16 from '../../assests/images/slider/wine_16.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import styles from './Slider.module.css';
import './Slider1.css';


const Slider1 = () => {
    return (
        <div>
            <Carousel infiniteLoop autoplay showThumbs={false} width={'85%'} >
                <div className="image">
                    <img src={wine_1} alt="wine13" />
                </div>
                <div className="image">
                    <img src={wine_2} alt="wine14" />
                </div>
                <div className="image">
                    <img src={wine_3} alt="wine15" />
                </div>
                <div className="image">
                    <img src={wine_4} alt="wine15" />
                </div>
                <div className="image">
                    <img src={wine_5} alt="wine15" />
                </div>
                <div className="image">
                    <img src={wine_6} alt="wine15" />
                </div>
                <div className="image">
                    <img src={wine_7} alt="wine15" />
                </div>
                <div className="image">
                    <img src={wine_8} alt="wine15" />
                </div>
                <div className="image">
                    <img src={wine_9} alt="wine15" />
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
