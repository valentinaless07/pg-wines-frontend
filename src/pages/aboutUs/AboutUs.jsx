import React from 'react';
import aboutXL from '../../assests/images/aboutXL.png';
import Navbar from '../../components/navbar/Navbar';
import styles from './AboutUs.module.css';


const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <img src={aboutXL} alt="About Us" />               
            </div>
        </>
    )
}

export default AboutUs;
