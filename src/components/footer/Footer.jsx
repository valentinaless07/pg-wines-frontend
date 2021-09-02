import React from 'react';
import styles from './Footer.module.css';
import ReactIcon from '../../Static/ReactIcon.png';
import PostgresqlIcon from '../../Static/PostgresqlIcon.png';
import IconRedux from '../../Static/IconRedux.png';
import NodeIcon from '../../Static/NodeIcon.png';
import ExpressIcon from '../../Static/ExpressIcon.png';



const Footer = () => {
    return (
        <>
        <div className={styles.container}>

            <div className={styles.tecnologia}>
                <div>
                    <h2>Tecnologias usadas</h2>
                </div>
                <div>
                    <img src={ReactIcon} alt="react-icon" />
                    <img src={PostgresqlIcon} alt="postgre-icon" />
                    <img src={IconRedux} alt="redux-icon" />
                </div>
                <div>
                    <img src={NodeIcon} alt="node-icon" />
                    <img src={ExpressIcon} alt="express-icon" />

                </div>
            </div>
            <div className={styles.piedepagina}>
                <div>
                    <h2>About Bodegas del Sur</h2>
                    <p>Bodegas del Sur es un E-commerce que nace como desafio de un grupo multinacional de estudiantes de "Henry"
                     quienes decidieron reforzar y mostrar los conocimientos addquiridos a lo largo
                     de un bootcamp intensivo que los introdujo de manera profesional al mundo del desarrollo web.
                      </p>
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
