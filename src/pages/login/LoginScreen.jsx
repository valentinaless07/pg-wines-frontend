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
        email: 'juancho@gmail.com',
        password: 'EnUnCampin_&23g'
    });
    const { email, password } = formValues;

    useEffect(() => {
        useRefEmail.current.select();
    }, []);    

    const handleLoginWithGoogle = (event) => {
        startGoogleLogin();
        history.replace('/home');
    }

    const handleStarLoginWithEmailAndPassword = (event) => {
        event.preventDefault();
        console.log(formValues);
        if (isFormValid()) {
            console.log('is form valid ok')
            startLoginWithEmailAndPassword(formValues.email, formValues.password);
            history.replace('/home');
        } else {
            console.log('Form is not valid');
        }
    }

    const isFormValid = () => {
        switch (true) {
            case (validator.isEmpty(email)):
                console.log('El email es requerido');
                setError('El email es requerido');
                return false;
            case (!validator.isEmail(email)):
                console.log('Ingresar un email valido');
                setError('Ingresar un email valido');
                return false;
            case (!password):
                console.log('La password es requerida');
                setError('La password es requerida');
                return false;
            case (password.length < 8):
                console.log('La password debe tener minimo 8 caracteres');
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
                <h3 className="auth__title">Login to your account</h3>

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
                        placeholder="Email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        placeholder="Password"
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
                        Login
                    </button>

                    {/* Login with social networks */}
                    <div className="auth__social-networks">
                        <p>Login with social networks</p>

                        <div className="auth__social-buttons-container" >
                            <div className="social-icon">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                <div onClick={handleLoginWithGoogle} >Sign in with Google</div>
                            </div>

                        </div>
                    </div>
                    <div className="auth__container-cancel-new-account">

                        <Link
                            id="new-account"
                            to="/register"
                            className="link"
                        >
                            Create new account
                        </Link>

                        <Link
                            id="cancel"
                            to="/home"
                            className="link"
                        >
                            Cancel
                        </Link>
                    </div>

                </form>
            </div>

            {
                    authState.fetching && 
                    <div style={{textAlign:'center', position:'fixed'}}>
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