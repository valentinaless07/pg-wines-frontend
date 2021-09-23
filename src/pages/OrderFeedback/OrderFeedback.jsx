import React from 'react';
import styles from './OrderFeedback.module.css';
import { useHistory } from 'react-router';

const OrderFeedback = () => {
    let history = useHistory()
    history.push("/")
    history.go(0)
    
    return (
        
        
        <>
            
            <div className={styles.container}>
                
            </div>
        </>
    )
}

export default OrderFeedback;