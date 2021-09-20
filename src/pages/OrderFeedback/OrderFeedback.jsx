import React from 'react';
import styles from './OrderFeedback.module.css';


const OrderFeedback = (props) => {
    console.log(props)
    return (
        <>
            
            <div className={styles.container}>
                <h1>Feedback</h1>
            </div>
        </>
    )
}

export default OrderFeedback;