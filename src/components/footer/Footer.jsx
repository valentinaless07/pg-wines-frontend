import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ReactIcon from '../../Static/ReactIcon.png';
import PostgresqlIcon from '../../Static/PostgresqlIcon.png';
import IconRedux from '../../Static/IconRedux.png';
import NodeIcon from '../../Static/NodeIcon.png';
import ExpressIcon from '../../Static/ExpressIcon.png';




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
                <div className={styles.contactusinfooter}>
                    <button>Contactanos</button>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>© Copyright 2021, Todos los derechos reservados "HENRY STUDENTS"</p>

            </div>
        </>
    )
}

export default Footer;
