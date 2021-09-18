import React from 'react';
import notfoundimage from '../../Static/notfoundimage.png'
import styles from './NotFound.module.css'


const NotFound = () => (

    <React.Fragment>
        <div className={styles.notfoundbg}>
            <img src={notfoundimage} alt="Error 404 Page not found" height="580px"/>           
        </div>

    </React.Fragment>
);

export default NotFound;