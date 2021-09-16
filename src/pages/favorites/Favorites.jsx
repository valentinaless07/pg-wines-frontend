import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import styles from './Favorites.module.css';


const Favorites = () => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>Mis Favoritos: </h1>
            </div>
        </>
    )
}

export default Favorites;
