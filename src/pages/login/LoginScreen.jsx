import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LoginScreen.module.css';
import { connect } from 'react-redux';
import { startGoogleLogin, logOutAction } from '../../redux/actions/authActions';

const LoginScreen = ({ authState, startGoogleLogin, logOutAction }) => {
    const history = useHistory();

    const handleLogout = () => {
        logOutAction();
    }

    const handleLogin = () => {
        startGoogleLogin();
        history.push('/home');
    }

    if (authState.fetching) return <p>Loading...</p>
    return (
        <>          
            <div className={`card ${styles.container} ${styles.mt_1}`}>
                {
                    authState.loggedIn
                        ? <h1>Logout</h1>
                        : <h1>Login with Google</h1>
                }
                {
                    authState.loggedIn
                        ? <button className={styles.btn} onClick={handleLogout}>Logout</button>
                        : <button className={styles.btn} onClick={handleLogin}>Login</button>
                }

            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        logOutAction: () => dispatch(logOutAction()),
        startGoogleLogin: () => dispatch(startGoogleLogin()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);









