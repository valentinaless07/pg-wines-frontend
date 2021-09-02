import React, { useEffect } from 'react';

// import styles from './Slider.module.css';
import './Slider2.css';
import slider_1 from '../../assests/images/slider/slider_1.png';
import slider_2 from '../../assests/images/slider/slider_2.png';
import slider_3 from '../../assests/images/slider/slider_3.png';
import slider_4 from '../../assests/images/slider/slider_4.png';
import slider_5 from '../../assests/images/slider/slider_5.png';
import slider_6 from '../../assests/images/slider/slider_6.png';
import slider_7 from '../../assests/images/slider/slider_7.png';
import slider_8 from '../../assests/images/slider/slider_8.png';
import slider_9 from '../../assests/images/slider/slider_9.png';


let interval;
// let event;
const Slider2 = () => {
    // const mySlides = useRef();
    // const dot = useRef();    
    useEffect(() => {
        window.addEventListener('mousemove',()=>{
            console.log('It is moving');
            clearInterval(interval);
        });
        // event = window.setEventListener()
        // let timer;
        // var slides = document.getElementsByClassName("mySlides");
        // console.log('1',slides);
        // console.log(mySlides.current);
        // console.log(dot.current);
        showSlides(slideIndex);
        interval = setInterval(() => {
            plusSlides(1);
        }, 2500);

        return() =>{
           clearInterval(interval);
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var slideIndex = 1;

    // Next/previous controls
    const plusSlides = (n) => {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    const currentSlide = (n) => {
        showSlides(slideIndex = n);
    }

    const showSlides = (n) => {
        // var i;
        // let slides = document.getElementsByClassName("mySlides");
        // let dots = document.getElementsByClassName("dot");
        let slides = document.getElementsByName("mySlides");
        let dots = document.getElementsByName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // My proof code
        if (!slides || slides.length <= 0) {
            // console.log('no render');
            return;
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    return (
        <>
            {/* Slideshow container */}
            <div className="slideshowContainer">

                {/* Full-width images with number and caption text  */}
                <div id="mySlides" className="mySlides fade">
                    <div className="numbertext">1 / 9</div>
                    <img src={slider_1} style={{ width: '100%' }} alt="photo1" />
                    <div className="text">Caption Text</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">2 / 9</div>
                    <img src={slider_2} style={{ width: '100%' }} alt="photo2" />
                    <div className="text">Caption Two</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">3 / 9</div>
                    <img src={slider_3} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">4 / 9</div>
                    <img src={slider_4} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">5 / 9</div>
                    <img src={slider_5} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">6 / 9</div>
                    <img src={slider_6} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">7 / 9</div>
                    <img src={slider_7} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">8 / 9</div>
                    <img src={slider_8} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>
                <div name="mySlides" className="mySlides fade">
                    <div className="numbertext">9 / 9</div>
                    <img src={slider_9} style={{ width: '100%' }} alt="photo3" />
                    <div className="text">Caption Three</div>
                </div>

                {/* Next and previous buttons */}
                <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
                <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>
                {/* <a href="#" className={styles.prev} onclick="plusSlides(-1)">&#10094;</a>
                <a href="#" className={styles.next} onclick="plusSlides(1)">&#10095;</a> */}
            </div>
            {/* <br /> */}

            {/* The dots/circles */}
            <div style={{ textAlign: 'center' }} >
                <span name="dot" className="dot" onClick={() => currentSlide(1)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(2)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(3)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(4)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(5)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(6)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(7)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(8)}></span>
                <span name="dot" className="dot" onClick={() => currentSlide(9)}></span>
            </div>
        </>

    );
}



// return (
//     <>
//         {/* Slideshow container */}
//         <div className={`${styles.slideshowContainer}`}>

//              {/* Full-width images with number and caption text  */}
//             <div name="mySlides" className={`${styles.mySlides} ${styles.fade}`}>
//                 <div className={`${styles.numbertext}`}>1 / 3</div>
//                 <img src={slider_13} style={{width:'100%'}} alt="photo1" />
//                 <div className={styles.text}>Caption Text</div>
//             </div>

//             <div name="mySlides" className={`${styles.mySlides} ${styles.fade}`}>
//                 <div className={`${styles.numbertext}`}>2 / 3</div>
//                 <img src={slider_15} style={{width:'100%'}} alt="photo2"/>
//                 <div className={styles.text}>Caption Two</div>
//             </div>

//             <div name="mySlides" className={`${styles.mySlides} ${styles.fade}`}>
//                 <div className={`${styles.numbertext}`}>3 / 3</div>
//                 <img src={slider_16} style={{width:'100%'}} alt="photo3"/>
//                 <div className={styles.text}>Caption Three</div>
//             </div>

//             {/* Next and previous buttons */}
//             <button className={styles.prev} onclick="plusSlides(-1)">&#10094;</button>
//             <button className={styles.next} onclick="plusSlides(1)">&#10095;</button>
//             {/* <a href="#" className={styles.prev} onclick="plusSlides(-1)">&#10094;</a>
//             <a href="#" className={styles.next} onclick="plusSlides(1)">&#10095;</a> */}
//         </div>
//         {/* <br /> */}

//         {/* The dots/circles */}
//         <div style={{textAlign:'center'}} >
//             <span className={styles.dot} onclick="currentSlide(1)"></span>
//             <span className={styles.dot} onclick="currentSlide(2)"></span>
//             <span className={styles.dot} onclick="currentSlide(3)"></span>
//         </div>
//     </>

// <div classNameName={`${styles.container}`}>       
//     <h1>Slider</h1>
// </div>

export default Slider2;
