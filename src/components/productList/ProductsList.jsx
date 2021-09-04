import React, { useEffect, useState } from 'react';
import styles  from './ProductsList.module.css';
import { connect } from 'react-redux';
import { getProducts, getCategory, filteredBy } from '../../redux/actions/userActions';
import './productList.css'

// const products= require('../../data/products').default

// const images = require.context('../../data/images', false)

// function importAll(r) {
//     let images = {};
//     // console.log(r.keys()[0])
//     r.keys().map((item, index)=>{images[item.replace('./', '')] = r(item)});
//     return images;
//   }

//   const img=importAll(images)
  
function ProductList({state, category, filtered, getProducts, getCategory, filteredBy}) {

    useEffect(()=>{        
        setTimeout(function(){ getProducts() }, 1000);
        getCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const[items, setItems] = useState(state)
    const[currentPage, setCurrentPage] = useState(1)
    const[resultsPage, setResultsPage] = useState(12)
    const totalResultsPage = currentPage * resultsPage
    const firstResultPAge = totalResultsPage - resultsPage    
    let mapState = state
    let currentResults = mapState.slice(firstResultPAge, totalResultsPage)
    const pRender= items.slice(firstResultPAge, totalResultsPage).map(item=>{
        
        return(items.length>0 && <div className={styles.productContainer} key={item.id}>
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
    })

    const pages =[]

    // if(items!==0){
    //     for (let i = 1; i <= Math.ceil(items.length/resultsPage); i++) {
    //         pages.push(i)}        
    // }else if(items.length===0){
        
    // }
    for (let i = 1; i <= Math.ceil(state.length/resultsPage); i++) {
        pages.push(i)}
    
    function handlePages(e){
        console.log(document.getElementsByClassName('activate'))
        document.getElementsByClassName('activate')[0].classList.remove('activate')
        let page = document.getElementById(e.target.id)
        page.classList.add('activate')
        setCurrentPage(e.target.id)
    }

    function activeFilter(){
        document.getElementById('sidebar').classList.toggle('filterActive')
    }

    function handleFilter(id){

        console.log(typeof(id)+" "+id)
        console.log(state)
        let prueba = state.filter(item=>item.category===id)
        setItems(prueba)
        console.log(prueba)
        // ----------------------------------------------
        // let prueba= document.getElementById()
    }


    return (
        <div className={`${styles.container}`}>
            <div id='sidebar' className='filter'>
                <span className='filterTittle'> Filter by</span>
                <button onClick={activeFilter} id='filter' className='filterBtn'><i className="fas fa-filter"></i></button>
                <div className='filterOptions'>
                    {
                    // <input type="checkbox" name="" id="" />
                        
                        category.map(category=><li className='filterItem' onClick={()=>handleFilter(category.id)} key={category.id}>
                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{category.category}
                        </li>)
                        // category.map(item=><React.Fragment><input id={item.id} onClick={handleFilter} type='checkbox'/><span>{item.category}</span><br/></React.Fragment>)
                    }
                </div>
            </div>
            {items.length>0 && <div className={styles.productList}>
                    {pRender}                
                </div>}
            <div className={styles.productList}>
                {
                    state.length>0 && items.length===0 ? currentResults.map(item=><div className={styles.productContainer} key={item.id}>
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
                    <React.Fragment></React.Fragment>
                }
            </div>
            <div>
                <ul className={styles.pagination}>
                    {pages.length>0 && pages.map(number=><li className={`${styles.pagItem} ${number===1 ? 'activate' : 'pag'}`} onClick={handlePages} id={number} key={number}>
                        {number}
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

function MapStateToProps(state){
    return{
        state: state.products.products,
        category: state.products.category,
        filtered: state.products.productsFiltered
    }
}

export default connect(MapStateToProps, {getProducts, getCategory, filteredBy})(ProductList)