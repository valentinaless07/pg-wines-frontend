import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.piedepagina}>
                    <div>
                        <h2>Siguenos</h2>
                    </div>
                    <div>
                        <FontAwesomeIcon className={styles.footericon} icon={faFacebook} />
                        <FontAwesomeIcon className={styles.footericon} icon={faTwitter} />
                        <FontAwesomeIcon className={styles.footericon} icon={faGithub} />
                    </div>
                </div>
                <div className={styles.conocenos}>
                    <Link to="equipo">
                    <h2>Conoce nuestro equipo</h2>
                    </Link>
                </div>
                <div className={styles.contactusinfooter}>
                    <h2>Escribinimos a <br /> bodegasdelsur@gmail.com</h2>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>© Copyright 2021, Todos los derechos reservados "HENRY STUDENTS"</p>
            </div>
        </>
    )
}

export default Footer;
