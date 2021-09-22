import React, { useState } from "react"
import styles from './comments.module.css'
import './comments.css'
import { connect } from "react-redux"

function Comments({authState, newComment, comments}){
    
    const[comment, setComment] = useState({
        comment: ''
    })

    function handleChange(e){
        setComment({
            ...comment,
            comment: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
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
    }

    return(<div className={styles.comments__Container}>
            {
            newComment && <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.infoUser}>
                    <img className={styles.userImage} src={authState.photoURL} alt="userPhoto" />
                    <span>{authState.displayName || 'Error'}</span>
                </div>
                <div className={styles.cup__Container}>
                    <span className={styles.glass}><i id='1' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='2' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='3' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='4' onClick={paint} className="fas fa-wine-glass"></i></span>
                    <span className={styles.glass}><i id='5' onClick={paint} className="fas fa-wine-glass"></i></span>
                </div>
                <textarea className={styles.textArea} onChange={handleChange} value={comment.comment} placeholder='Deja tu comentario aqui...' name="comment" id="comment"></textarea>
                <button className={`${styles.optBtn} ${styles.left}`}><i className="fas fa-times"></i></button>
                <button className={styles.optBtn} type='submit'><i className="far fa-save"></i></button>
            </form>
            }
            <div>
                {
                    comments.length>0 && comments.map(box=><div id='commentsRatio' key={box.id}>
                    {/* comments.length>0 && comments.map(box=><div key={box.id}> */}
                        <div>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.points>=1 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.points>=2 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.points>=3 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.points>=4 && 'star'}`}></i></span>
                            <span className={styles.glass}><i className={`fas fa-wine-glass ${box.points>=5 && 'star'}`}></i></span>
                        </div>
                            <p>{box.review}</p>
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

export default connect(mapStateToProps, null)(Comments);
