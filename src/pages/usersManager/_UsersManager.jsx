import Swal from 'sweetalert2';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';
import uniqid from 'uniqid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { getUsers, updateUserById } from '../../redux/actions/usersManagerActions';
import AdminAreaNavbar from "../../components/adminAreaNavbar/AdminAreaNavbar"
import styles from './UsersManager.module.css';



const initialState = {
    name: false,
    email: 0,
    photoUrl: 10,
    admin: false,
    birdthDate: '',
    active: true,
    phone: '',
    resetPassword: 'false',
}
const UsersManager = ({ getUsers, usersState, updateUserById }) => {

    useEffect(() => {
        getUsers();
    }, [getUsers])


    const handleChangeAdmin = (id, admin) => {
        console.log({ id, admin })
        updateUserById({ id, admin })
    }

    const handleChangeActiveUser = (id, active) => {
        console.log({ id, active })
        updateUserById({ id, active })
    }

    return (

        <div className={styles.main_container} >
            <AdminAreaNavbar />
            {/* {
            usersState.fetching &&
                <div className={styles.spinner_container} >
                    <img src={spinner} width="200px" alt="loading..." />
                </div>
        } */}
            <div className={styles.table_container}>
                <table id={styles["users"]}>
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Foto</th>
                            <th>Telefono</th>
                            <th>Fecha Nacimiento</th>
                            <th>Reset Pasw</th>
                            <th>User/Admin</th>
                            <th>Activo</th>
                        </tr>
                        {
                            usersState.map(user => (
                                <tr key={uniqid()}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <img src={user.photoURL} className={styles.photo} width="40px" alt="Foto del usuario" />
                                    </td>
                                    <td>{user.phone}</td>
                                    <td>{user.birdthDate}</td>
                                    <td>no</td>
                                    <td className={styles.user_or_admin}>
                                        {
                                            (user.admin)
                                                ? <i onClick={(id) => handleChangeAdmin(user.id, user.admin)} className="fas fa-crown fa-2x" ></i>
                                                : <i onClick={(id) => handleChangeAdmin(user.id, user.admin)} className="fas fa-user fa-2x" ></i>
                                        }

                                    </td>
                                    <td className={styles.user_active}>
                                        {
                                            (user.active)
                                                // ? <div className={styles.user_active_true}></div>
                                                // : <div className={styles.user_active_false}></div>

                                                ? <i onClick={(id) => handleChangeActiveUser(user.id, user.active)} className={`fas fa-circle fa-2x`} ></i>
                                                : <i onClick={(id) => handleChangeActiveUser(user.id, user.active)} className={`fas fa-circle fa-2x`} ></i>
                                        }

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        usersState: state.usersManager.users,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        updateUserById: (payload) => dispatch(updateUserById(payload))
        // deleteUserById: (id) => dispatch(deleteUserById(id)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManager);


