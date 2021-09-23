import validator from 'validator';
import useForm from '../../hooks/useForm';
import React, { useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { startGoogleLogin, logOutAction, startLoginWithEmailAndPassword } from '../../redux/actions/authActions';
import { setError, removeError } from '../../redux/actions/uiActions';
import './LoginScreen.css';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';


const LoginScreen = ({ authState, uiState, setError, removeError, startLoginWithEmailAndPassword, startGoogleLogin }) => {
    const { msgError } = uiState;
    const useRefEmail = useRef();
    const history = useHistory();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });
    const { email, password } = formValues;

    useEffect(() => {
        useRefEmail.current.select();
    }, []);

    useEffect(() => {
        if (authState.loggedIn) {
            return history.replace('/');
        }

    }, [authState.loggedIn, history]);



    const handleLoginWithGoogle = (event) => {
        startGoogleLogin();
    }

    const handleStarLoginWithEmailAndPassword = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            await startLoginWithEmailAndPassword(formValues.email, formValues.password);
        }
    }

    const isFormValid = () => {
        switch (true) {
            case (validator.isEmpty(email)):
                setError('El email es requerido');
                return false;
            case (!validator.isEmail(email)):
                setError('Ingresar un email valido');
                return false;
            case (!password):
                setError('La password es requerida');
                return false;
            case (password.length < 8):
                setError('La password debe tener minimo 8 caracteres');
                return false;
            default:
                removeError();
                return true;
        }
    }

    return (
        <div className="auth__main">
            <div className="auth__box-container">
                {/* {
                    authState.fetching && 
                    <div style={{textAlign:'center'}}>
                        <img src={spinner} width="80px" alt="loading..." />
                    </div>
                } */}
                <h3 className="auth__title">Acceder a tu cuenta</h3>

                <form className="login_form" onSubmit={handleStarLoginWithEmailAndPassword}>
                    {
                        msgError &&
                        (
                            <div className="auth__alert-error">
                                {msgError}
                            </div>
                        )
                    }
                    {/* Login with email and password */}
                    <input
                        ref={useRefEmail}
                        type="text"
                        placeholder="Escribí aquí tu correo electrónico"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        className="auth__input"
                        value={password}
                        onChange={handleInputChange}
                    />

                    <button
                        disabled={authState.fetching}
                        onClick={handleStarLoginWithEmailAndPassword}
                        type="submit"
                        className="auth__button"
                    >
                        Acceder
                    </button>
                    <div className="auth_forgot_password">
                        <Link                        
                            to="/forgotpassword"
                            className="link"
                        >
                            Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Login with social networks */}
                    <div className="auth__social-networks">
                        <p>Acceder con redes sociales</p>

                        <div className="auth__social-buttons-container" >
                            <div className="social-icon">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                <div onClick={handleLoginWithGoogle} >Inicia sesión con Google</div>
                            </div>

                        </div>
                    </div>
                    <div className="auth__container-cancel-new-account">

                        <Link
                            id="new-account"
                            to="/register"
                            className="link"
                        >
                            Crear una cuenta
                        </Link>

                        <Link
                            id="cancel"
                            to="/"
                            className="link"
                        >
                            Cancelar
                        </Link>
                    </div>

                </form>
            </div>

            {
                authState.fetching &&
                <div style={{ textAlign: 'center', position: 'fixed' }}>
                    <img src={spinner} width="200px" alt="loading..." />
                </div>
            }
        </div >

    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth,
        uiState: state.ui,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setError: (error) => dispatch(setError(error)),
        removeError: () => dispatch(removeError()),
        logOutAction: () => dispatch(logOutAction()),
        startGoogleLogin: () => dispatch(startGoogleLogin()),
        startLoginWithEmailAndPassword: (uid, displayName) => dispatch(startLoginWithEmailAndPassword(uid, displayName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);