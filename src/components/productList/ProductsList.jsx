import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProducts, getProductsbyCategory } from '../../redux/actions/userActions';
import { getCategories } from '../../redux/actions/manageProductsActions';
import ProductsContainer from './productsContainer';
import './productList.css'
  
function ProductList({state, manageProductState, getProductsbyCategory, getProducts, getCategories}) {

    useEffect(()=>{        
        getProducts();
        getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    

    const[items, setItems] = useState(state)
    const[currentPage, setCurrentPage] = useState(1)
    const[resultsPage, setResultsPage] = useState(12)
    const totalResultsPage = currentPage * resultsPage
    const firstResultPAge = totalResultsPage - resultsPage    
    let mapState = state
    let currentResults = mapState.slice(firstResultPAge, totalResultsPage)
    // const pRender= items.slice(firstResultPAge, totalResultsPage).map(item=>{
        
    //     return(items.length>0 && <div className={styles.productContainer} key={item.id}>
    //         <div className={styles.title}>
    //             <span>{item.name}</span>
    //             <button className={`${styles.bnt} ${styles.bntFav}`}><i className="fas fa-heart"></i></button>
    //         </div>
    //         <div className={styles.imgContainer}>
    //             <img className={styles.img} src={item.image} alt=''/>
    //         </div>
    //         <div className={styles.price}>
    //             {item.discount>5 && <span>{item.discount}% Desc</span>}
    //             {item.discount>5 ? <span className={styles.desc}>{'$ '+((item.cost)*(1-(item.discount/100))).toFixed(2)}</span>:<span>$ {item.cost}</span>}
    //         </div>
    //         <button className={`${styles.bnt} ${styles.btnBuy}`}><i className="fas fa-shopping-cart"></i> COMPRAR</button>
    //     </div>)
    // })

    const pages =[]

    for (let i = 1; i <= Math.ceil(state.length/resultsPage); i++) {
        pages.push(i)}
    
    function handlePages(e){
        document.getElementsByClassName('activate')[0].classList.remove('activate')
        let page = document.getElementById(e.target.id)
        page.classList.add('activate')
        setCurrentPage(e.target.id)
    }

    function activeFilter(){
        document.getElementById('sidebar').classList.toggle('filterActive')
    }

    function handleFilter(name){
        // let prueba = state.filter(item=>item.category===id)
        // setItems(prueba)
        name!=='clear' ?
        getProductsbyCategory(name)
        :
        getProducts()
    }


    return (
        // <div className={`${styles.container}`}>
        <React.Fragment>
            <div id='sidebar' className='filter'>
                <span className='filterTittle'> Filter by</span>
                <button onClick={activeFilter} id='filter' className='filterBtn'><i className="fas fa-filter"></i></button>
                <div className='filterOptions'>
                    <select name='categories'>
                        <option></option>
                    </select>
                    {
                    // <input type="checkbox" name="" id="" />
                        
                        manageProductState.map(category=><li className='filterItem' onClick={()=>handleFilter(category.name)} key={category.id}>
                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{category.name}
                        </li>)
                        
                        // manageProductState.map(item=><React.Fragment><input id={item.id} onClick={handleFilter} type='checkbox'/><span>{item.category}</span><br/></React.Fragment>)
                    }
                    <li className='filterItem' onClick={()=>handleFilter('clear')}>Clear All</li>
                </div>
            </div>
        {/* //     {items.length>0 && <div className={styles.productList}>
        //             {pRender}                
        //         </div>}
        //     <div className={styles.productList}> */}
        {/* //         { */}
        {/* //             state.length>0 && items.length===0 ? currentResults.map(item=><div className={styles.productContainer} key={item.id}>
        //                 <div className={styles.title}>
        //                     <span>{item.name}</span>
        //                     <button className={`${styles.bnt} ${styles.bntFav}`}><i className="fas fa-heart"></i></button>
        //                 </div>
        //                 <div className={styles.imgContainer}>
        //                     <img className={styles.img} src={item.image} alt=''/>
        //                 </div>
        //                 <div className={styles.price}>
        //                     {item.discount>5 && <span>{item.discount}% Desc</span>}
        //                     {item.discount>5 ? <span className={styles.desc}>{'$ '+((item.cost)*(1-(item.discount/100))).toFixed(2)}</span>:<span>$ {item.cost}</span>}
        //                 </div>
        //                 <button className={`${styles.bnt} ${styles.btnBuy}`}><i className="fas fa-shopping-cart"></i> COMPRAR</button>
        //             </div>)
        //             :
        //             <React.Fragment></React.Fragment>
        //         } */}
        {/* //     </div> */}
        {/* //     <div>
        //         <ul className={styles.pagination}>
        //             {pages.length>0 && pages.map(number=><li className={`${styles.pagItem} ${number===1 ? 'activate' : 'pag'}`} onClick={handlePages} id={number} key={number}>
        //                 {number}
        //             </li>)}
        //         </ul>
        //     </div>
        // </div> */}
        
            {state.length>0 ? <ProductsContainer state={state}/> : <h1>Cargando...</h1>}            
        </React.Fragment>
    )
}

function MapStateToProps(state){
    return{
        state: state.products.products,
        manageProductState: state.manageProducts.categories
    }
}

export default connect(MapStateToProps, {getProducts, getProductsbyCategory, getCategories})(ProductList)