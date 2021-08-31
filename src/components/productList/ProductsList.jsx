import React, { useEffect, useState } from 'react';
import styles  from './ProductsList.module.css';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/userActions';

// const products= require('../../data/products').default

// const images = require.context('../../data/images', false)

// function importAll(r) {
//     let images = {};
//     // console.log(r.keys()[0])
//     r.keys().map((item, index)=>{images[item.replace('./', '')] = r(item)});
//     return images;
//   }

//   const img=importAll(images)
  
function ProductList({state, getProducts}) {

    useEffect(()=>{        
        setTimeout(function(){ getProducts() }, 1000);
    }, [])

    const[currentPage, setCurrentPage] = useState(1)
    const[resultsPage, setResultsPage] = useState(12)

    const totalResultsPage = currentPage * resultsPage
    const firstResultPAge = totalResultsPage - resultsPage
    const currentResults = state.slice(firstResultPAge, totalResultsPage)

    const pages =[]

    for (let i = 1; i <= Math.ceil(state.length/resultsPage); i++) {
        pages.push(i)
    }

    function handlePages(e){
        setCurrentPage(e.target.id)
        document.getElementsByClassName('ProductsList_active__1qDe2')[0].classList.remove('ProductsList_active__1qDe2')
        let page = document.getElementById(e.target.id)
        page.classList.add('ProductsList_active__1qDe2')
    }

    return (
        <div className={`${styles.container}`}>
            <div className={styles.productList}>
                {
                    state.length>0 ? currentResults.map(item=><div className={styles.productContainer} key={item.id}>
                        <div className={styles.title}>
                            <span>{item.name}</span>
                            <button className={`${styles.bnt} ${styles.bntFav}`}><i className="fas fa-heart"></i></button>
                        </div>
                        <div className={styles.imgContainer}>
                            <img className={styles.img} src={item.image} alt=''/>
                        </div>
                        <div className={styles.price}>
                            {item.discount>5 && <span>{item.discount}% Desc</span>}
                            {item.discount>5 ? <span className={styles.desc}>{'$ '+((item.cost)*(1-(item.discount/100))).toFixed(2)}</span>:<span>$ {item.cost}</span>}
                        </div>
                        <button className={`${styles.bnt} ${styles.btnBuy}`}><i className="fas fa-shopping-cart"></i> COMPRAR</button>
                    </div>)
                    :
                    <h1>Cargando...</h1>
                }
            </div>
            <div>
                <ul className={styles.pagination}>
                    {pages.length>0 && pages.map(number=><li className={`${styles.pagItem} ${number===1 && styles.active}`} onClick={handlePages} id={number} key={number}>
                        {number}
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

function MapStateToProps(state){
    return{
        state: state.products.products
    }
}

export default connect(MapStateToProps, {getProducts})(ProductList)