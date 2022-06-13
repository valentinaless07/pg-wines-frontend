import Swal from 'sweetalert2';
import validator from 'validator';
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styles from './ForgotPasswordScreen.module.css';
import useForm from '../../hooks/useForm';
// import { setError } from '../../redux/actions/uiActions';
import { sendEmail, removeError, removeMsg } from '../../redux/actions/forgotPasswordActions';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';


const initialState = {
    email: '',
}

const ForgotPasswordScreen = ({ authState, uiState, removeError, removeMsg, sendEmail, forgotPasswordState }) => {
    const history = useHistory();
    const useRefName = useRef();
    const [formValues, handleInputChange] = useForm(initialState);
    const { email } = formValues;
    const [error, setError] = useState({ error: null })

    useEffect(() => {
        useRefName.current.select();
    }, []);

    useEffect(() => {
        if (forgotPasswordState.msg) {
            getMessagge(forgotPasswordState.msg).then((resp) => {
                removeMsg();
                history.push('/login');
            });
        }


    }, [forgotPasswordState.msg, removeMsg, history]);


    const getMessagge = async (msg) => {
        await Swal.fire({
            icon: 'success',
            title: 'Atención',
            text: msg
        });

    }

    useEffect(() => {
        if (forgotPasswordState.error) {
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                text: forgotPasswordState.error
            });
            removeError();
        }
    }, [forgotPasswordState.error, removeError]);


    useEffect(() => {

    }, []);

    const handleSendEmail = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            await sendEmail(email);
        }
    }

    const isFormValid = () => {
        switch (true) {
            case (validator.isEmpty(email)):
                setError({ error: 'El email es requerido' });
                return false;
            case (!validator.isEmail(email)):
                setError({ error: 'El email no es valido' });
                return false;
            default:
                setError({});
                return true;
        }
    }

    return (
        <div className={styles.forgot_password__main}>
            <div className={styles.forgot_password__box_container}>
                <h3 className={styles.forgot_password__title}>Introduce un email</h3>

                <form className={styles.forgot_password_form} onSubmit={handleSendEmail}>
                    {
                        error.error &&
                        (
                            <div className={styles.auth__alert_error}>
                                {error.error}
                            </div>
                        )
                    }
                    <input
                        ref={useRefName}
                        type="text"
                        placeholder="Email"
                        name="email"
                        className={styles.forgot_password__input}
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <button
                        disabled={forgotPasswordState.fetching}
                        type="submit"

                        className={styles.forgot_password__button}
                    >
                        Enviar
                    </button>

                    <Link
                        to="/login"
                        className={styles.link}
                    >
                        Volver al login?
                    </Link>

                </form>
            </div>
            {
                forgotPasswordState.fetching &&
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
        // setError: (error) => dispatch(setError(error)),
        removeError: () => dispatch(removeError()),
        removeMsg: () => dispatch(removeMsg()),
        sendEmail: (email) => dispatch(sendEmail(email)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);


