import Swal from 'sweetalert2';
// import validator from 'validator';
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styles from './ResetPasswordScreen.module.css';
import useForm from '../../hooks/useForm';
// import { setError } from '../../redux/actions/uiActions';
import { resetPassword,  removeError, removeMsg } from '../../redux/actions/forgotPasswordActions';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';


const initialState = { 
    password: '',
    password2: '',
}

const ResetPasswordScreen = ({ authState, uiState, removeError, resetPassword, forgotPasswordState, removeMsg }) => {
    const history = useHistory();
    const { userId, token } = useParams();
    
    const useRefPassword = useRef();
    const [formValues, handleInputChange] = useForm(initialState);
    const { password, password2 } = formValues;
    const { msgError } = uiState;
    const [error, setError] = useState({ error: null })

    useEffect(() => {
        useRefPassword.current.select();
    }, []);
    

    useEffect(() => {
        if(forgotPasswordState.msg){
            getMessagge(forgotPasswordState.msg).then((resp)=>{               
                removeMsg();               
                history.push('/login');
            });          
        }                  
                   
    }, [forgotPasswordState.msg, removeMsg, history]);

    useEffect(() => {
        if(forgotPasswordState.error){
              Swal.fire({
                icon: 'error',
                title: 'Ooops',
                text: forgotPasswordState.error
            });
            removeError();          
        }
    }, [forgotPasswordState.error, removeError]);

    const handleSendEmail = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            resetPassword(userId, password); 
        }
    }

    const getMessagge = async(msg)=>{
        await Swal.fire({
            icon: 'success',
            title: 'Atención',
            text: msg
        });
        
    }

    const isFormValid = () => {
        switch (true) {
          
            case (!password):
                setError({error:'La contraseña es requerida'});
                return false;
            case (password.length < 8):
                setError({error:'La contraseńa debe tener minimo 8 caracteres'});
                return false;
            case (password !== password2):
                setError({error:'Las contraseñas no coinciden'});
                return false;
            
            default:
                setError({});
                return true;
        }
    }

    return (
        <div className={styles.reset_password__main}>
            <div className={styles.reset_password__box_container}>
                <h3 className={styles.reset_password__title}>Reset Password</h3>

                <form className={styles.reset_password_form} onSubmit={handleSendEmail}>
                    {
                        error.error &&
                        (
                            <div className={styles.auth__alert_error}>
                                {error.error}
                            </div>
                        )
                    }                
                     <input
                        ref={useRefPassword}
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        className="register__input"
                        autoComplete="off"
                        value={password}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        name="password2"
                        className="register__input"
                        autoComplete="off"
                        value={password2}
                        onChange={handleInputChange}
                    />

                    <button
                        disabled={authState.fetching}
                        type="submit"
                        className={styles.reset_password__button}
                    >
                        Enviar
                    </button>

                    <Link
                        to="/login"
                        className={styles.link}
                    >
                        Volver atras?
                    </Link>

                </form>
            </div>
            {
                authState.fetching &&
                <div style={{ textAlign: 'center', position: 'fixed' }}>
                    <img src={spinner} width="200px" alt="loading..." />
                </div>
            }
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        uiState: state.ui,
        authState: state.auth,
        forgotPasswordState: state.forgotPassword,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {    
        removeError: () => dispatch(removeError()),
        removeMsg: () => dispatch(removeMsg()),
        resetPassword: (userId, password) => dispatch(resetPassword(userId, password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);


