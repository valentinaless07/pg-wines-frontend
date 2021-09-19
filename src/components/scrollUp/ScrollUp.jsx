import { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use'
import styles from './scrollUp.module.css'

export default function ScrollUp(){

    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        if(pageYOffset>400){
            setVisible(true)
        }else{
            setVisible(false)
        }
    }, [pageYOffset])

    if(!visible){
        return false;
    }

    const scrollTop = () => window.scrollTo({top:0, behavior: 'smooth'})

    return(<div className={styles.btnScrollUP}>
        <i onClick={scrollTop} className={`fas fa-arrow-alt-circle-up ${styles.btnIcon}`}></i>
    </div>)
}