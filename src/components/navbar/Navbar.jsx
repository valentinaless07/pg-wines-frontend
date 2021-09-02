import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './Navbar.module.css';
import AuthContext from '../../auth/AuthContext';
// import logo from '../../assests/images/logoBodegasDelSur.png';
import { types } from '../../types/types';

const Navbar = () => {
    const { user: { name }, dispatch } = useContext(AuthContext);
    const history = useHistory();



    const handleLogout = () => {
        history.replace('/login/24');
        dispatch({type: types.logout});
    }
   

    return (
        <nav className={styles.container}>
            <ul className={styles.ulContainer}>
                <li>
                    <NavLink to="/">  
                    Bodegas del Sur                      
                        {/* <img src={logo} alt="" /> */}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">About</NavLink>
                </li>
                <span>
                    {name}
                </span>
                <li>
                    <button onClick={handleLogout} >Logout</button>
                    {/* <NavLink onClick={handleLogout} to="/login/24">Logout</NavLink> */}
                </li>
            </ul>
        </nav>
    );

    // return (
    //     <div className={styles.container}>
    //         <h1>Navbar</h1>
    //         user
    //     </div>
    // );
}

export default Navbar;
