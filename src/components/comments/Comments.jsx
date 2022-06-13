import React, { useEffect, useState } from "react"
import styles from './comments.module.css'
import './comments.css'
import { connect } from "react-redux"
import { postCommnets } from "../../redux/actions/comments"
import { useHistory } from "react-router"
import uniqid from 'uniqid';

function Comments({idUser, idProduct, authState, newComment, comments, postCommnets}){

    const[comment, setComment] = useState({
        comment: '',
        rating: 0,
        idProd:''
    })

    let history = useHistory();

    useEffect(()=>{
        setComment({
            ...comment,
            idProd: idProduct
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[idProduct])

    function handleChange(e){
        setComment({
            ...comment,
            comment: e.target.value
        })
    }

    
    function paint(e){
        for (let i = 1; i <= 5; i++) {
            let prueba = document.getElementById(i)
            prueba.classList.remove('star')            
        }
        for (let i = 1; i <= e.target.id; i++) {
            let prueba = document.getElementById(i)
            prueba.classList.add('star')            
        }
        setComment({
            ...comment,
            rating: e.target.id
        })
    }
    
    function clean(){
        for (let i = 1; i <= 5; i++) {
            let prueba = document.getElementById(i)
            prueba.classList.remove('star')            
        }
        setComment({
            ...comment,
            rating: 0,
            comment:''
        })
    }

    function handleSubmit(e){
        if(comment.comment!==''){
            setComment({
                ...comment,
                idProd: idProduct
            })
            postCommnets(idUser, comment)
            clean()
            history.push(`/product/${idProduct}`)
        }
    }
    
    return(<div className={styles.comments__Container}>
            {
            newComment && <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.infoUser}>
                    <img className={styles.userImage} src={authState.photoURL} alt="userPhoto" />
                    {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<span>{authState.displayName.toUpperCase() || 'Error'}</span>
                </div>
                <div className={styles.cup__Container}>
                    <span className={styles.glass}><i id='1' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='2' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='3' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='4' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='5' onClick={paint} className="fas fa-wine-glass"></i></span>
                </div>
                <textarea className={styles.textArea} onChange={handleChange} value={comment.comment} placeholder='Deja tu comentario aqui...' name="comment" id="comment"></textarea>
                <button onClick={clean} className={`${styles.optBtn} ${styles.left}`}><i className="fas fa-times"></i></button>
                <button className={styles.optBtn} type='submit'><i className="far fa-save"></i></button>
            </form>
            }
            <div>
                {
                    comments.length>0 && comments.map(box=><div className={styles.form} id='commentsRatio' key={uniqid()}>
                    {/* comments.length>0 && comments.map(box=><div key={box.id}> */}
                        <div className={styles.cup__Container}>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.rating>=1 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.rating>=2 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.rating>=3 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.rating>=4 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.rating>=5 && 'star'}`}></i></span>
                        </div>
                        <div className={styles.cup__Container}>
                            <p>{box.comment}</p>
                        </div>
                    </div>)
                }
            </div>
    </div>)
}

const mapStateToProps = (state) => {
    return {
      authState: state.auth,
    };
}

export default connect(mapStateToProps, {postCommnets})(Comments);
