// import Swal from 'sweetalert2';
import validator from 'validator';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './RegisterScreen.css';
import useForm from '../../hooks/useForm';
import { setError, removeError } from '../../redux/actions/uiActions';
import { startRegisterWithEmailAndPassword } from '../../redux/actions/authActions';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';

const initialState = {
    name: 'Juancho',
    email: 'juancho@gmail.com',
    password: 'EnUnCampin_&23g',
    password2: 'EnUnCampin_&23g'
}

const RegisterScreen = ({ authState, uiState, setError, removeError, startRegisterWithEmailAndPassword }) => {
    const history = useHistory();
    const useRefName = useRef();
    const [formValues, handleInputChange] = useForm(initialState);
    const { name, email, password, password2 } = formValues;
    const { msgError } = uiState;
    // console.log('msgError: ', msgError);
    useEffect(() => {
        useRefName.current.select();
    }, []);

    const handleRegister = async(event) => {
        event.preventDefault();
        if (isFormValid()) {
            // console.log('formValues: ', formValues);
            console.log('1')
            await startRegisterWithEmailAndPassword(name, email, password);
            console.log('2')
            console.log('error: ', authState.error);
            if(authState.error){
                console.log('error');               
                console.log('3');

            }else{
                console.log('4')
                return history.replace('/home');
            }
        }else {
            console.log('Form is not valid');
        }
    }
    
    const isFormValid = () => {
        switch (true) {
            case (name.trim().length === 0):
                setError('El nombre es requerido');
                return false;
            case (validator.isEmpty(email)):
                setError('El email es requerido');
                return false;
            case (!validator.isEmail(email)):
                setError('El email no es valido');
                return false;
            case (!password):
                setError('La password es requerida')
                return false;
            case (password.length < 8):
                setError('La password debe tener minimo 8 caracteres');
                return false;
            case (!validator.equals(password, password2)):
                setError('Las passwords no son iguales');
                return false;
            default:
                removeError();
                return true;
        }
    }

    return (
        <div className="register__main">
            <div className="register__box-container">
                <h3 className="register__title">Register</h3>

                <form className="register_form" onSubmit={handleRegister}>
                    {
                        msgError &&
                        (
                            <div className="auth__alert-error">
                                {msgError}
                            </div>
                        )
                    }
                    <input
                        ref={useRefName}
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="register__input"
                        autoComplete="off"
                        value={name}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="register__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="register__input"
                        autoComplete="off"
                        value={password}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                        className="register__input"
                        autoComplete="off"
                        value={password2}
                        onChange={handleInputChange}
                    />

                    <button
                        disabled={authState.fetching}
                        type="submit"
                        className="register__button"
                    >
                        Register
                    </button>

                    <Link
                        to="/login"
                        className="link"
                    >
                        Already registered?
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setError: (error) => dispatch(setError(error)),
        removeError: () => dispatch(removeError()),
        startRegisterWithEmailAndPassword: (name, email, password) => dispatch(startRegisterWithEmailAndPassword(name, email, password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);


