import uniqid from 'uniqid';
import React, { useEffect, useRef } from 'react';

import styles from './Slider2.module.css';
import slider from '../../data/slider';
const sliderImages = require.context('../../assests/images/slider', true);

// let interval;
// let event;
const Slider2 = () => {
    const mySlides = useRef();
    // const dot = useRef();    
    useEffect(() => {
        // window.addEventListener('mousemove',()=>{
        //     console.log('It is moving');
        //     clearInterval(interval);
        // });


        showSlides(slideIndex);
        // interval = setInterval(() => {
        //     plusSlides(1);
        // }, 2500);

        // return() =>{
        //    clearInterval(interval);
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let slideIndex = 1;

    // Next/previous controls
    const plusSlides = (n) => {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    const currentSlide = (n) => {
        showSlides(slideIndex = n);
    }

    const showSlides = (n) => {

        let slides = document.getElementsByName("mySlides");
        let dots = document.getElementsByName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            // dots[i].className = dots[i].className.replace(" active", "");
            dots[i].className = dots[i].className.replace(" Slider2_active__2-fvX", "");
        }

        // My proof code
        if (!slides || slides.length <= 0) {
            // console.log('no render');
            return;
        }
        slides[slideIndex - 1].style.display = "block";
        // dots[slideIndex - 1].className += " active";
        dots[slideIndex - 1].className += " Slider2_active__2-fvX";
    }

    const handleVerMasClick = (e) => {
        console.log('hola')
        console.log(e);
        // console.log(e.target.value);
    }

    return (
        <>
            {/* Slideshow container */}
            <div className={styles.slideshowContainer} >
                {/* Full-width images with number and caption text  */}
                {
                    slider.map(({ photo, caption, onClickGoTo }, idx) => {
                        return <div key={uniqid()} ref={mySlides} name="mySlides" className={`${styles.mySlides} ${styles.fade}`}>
                            {/* <div className={styles.numbertext} >1 / 11</div> */}
                            <img src={sliderImages(`./${photo}.png`).default} style={{ width: '100%' }} alt="photo2" onClick={handleVerMasClick} />
                            {/* <div className={styles.text}>Caption Two</div> */}
                        </div>
                    })
                }

                {/* Next and previous buttons */}
                <button className={styles.prev} onClick={() => plusSlides(-1)}>&#10094;</button>
                <button className={styles.next} onClick={() => plusSlides(1)}>&#10095;</button>
            </div>
            {/* <br /> */}
            {/* The dots/circles */}
            <div style={{ textAlign: 'center' }} >
                {
                    slider.map((_, idx) => {
                        return <span key={uniqid()} name="dot" className={styles.dot} onClick={() => currentSlide(idx + 1)}></span>
                    })
                }
            </div>
        </>
    );
}

export default Slider2;
