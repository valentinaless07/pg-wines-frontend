import Swal from 'sweetalert2';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
// import { getInfo, createElement, deleteElement, updateElement } from "../../redux/actions/brandsAndCategories";
import { getUsers, updateUserById } from '../../redux/actions/usersManagerActions';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';
import styles from './UsersManager.module.css';
import { useLocation } from 'react-router';
import AdminAreaNavbar from '../adminAreaNavbar/AdminAreaNavbar';
import { dateToSpanishString, sortAlphabeticAsc } from '../../helpers/helpers';

const initialState = {
    name: '',
    email: 0,
    photoUrl: 10,
    admin: false,
    birthDate: '',
    active: true,
    phone: '',
    resetPassword: 'false',
}

function UsersManager({ usersState, getInfo, getUsers, updateUserById }) {
    const searchRef = useRef();
    let element = useLocation().search.split('=').slice(-1)[0];

    const [search, setSearch] = useState(initialState);
    console.log(usersState.fetching)
    useEffect(() => {
        searchRef.current.select();
    }, []);

    useEffect(() => {
        getUsers()
    }, [search.name, getUsers]);


    function handleRegex(e) {
        setSearch({
            ...search,
            name: e.target.value
        })
    }


    function handleCreate() {
        if (search.name !== '') {
            // createElement(element, search)
            Swal.fire({
                title: `${search.name} creado satisfactoriamente`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then(() => {
                getInfo(element)
            })
        }
        setSearch({
            name: ''
        })
    }

    function filter({ name }) {
        let regEx = new RegExp(`${search.name}`, 'gi')
        return regEx.test(name)
    }

    function handleUpdateAdminStatus(id, admin) {
        admin = !admin;
        updateUserById({ id, admin: admin.toString() });
        searchRef.current.select();
    }
    function handleUpdateActiveStatus(id, active) {
        active = !active;
        updateUserById({ id, active: active.toString() });
        searchRef.current.select();
    }



    return (
        <React.Fragment>
            <AdminAreaNavbar />
            <div className={styles.admin}>
                {
                    usersState.fetching &&
                    <div className={styles.spinner_container} >
                        <img src={spinner} width="200px" alt="loading..." />
                    </div>
                }
                {/* <h1>{element === 'categories' ? 'Categorias' : 'Marcas'}</h1> */}
                <form className={styles.form} onSubmit={handleCreate}>
                    <span>Busqueda</span>
                    <input ref={searchRef} className={styles.inputSearch} placeholder='nombre usuario' onChange={handleRegex} value={search.name} type='text' />
                    {/* <button className={styles.btnCreate}>{`CREAR`}</button> */}
                </form>
                <div className={styles.titleContainer}>
                    <div className={styles.optionsContainer} >
                        <div className={`${styles.name_item} ${styles.title}`}>
                            <span>Nombre</span>
                        </div>
                        <div className={`${styles.email_item} ${styles.title}`}>
                            <span>Email</span>
                        </div>
                        <div className={`${styles.photo_url_item} ${styles.title}`}>
                            <span>Foto</span>
                        </div>
                        <div className={`${styles.birdth_date_item} ${styles.title}`}>
                            <span>Fecha Nac.</span>
                        </div>
                        <div className={`${styles.phone_item} ${styles.title}`}>
                            <span>Telefono</span>
                        </div>
                        <div className={`${styles.phone_item} ${styles.title}`}>
                            <span>Admin Visible</span>
                        </div>
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    {
                        usersState.users.filter(user => filter(user)).sort(sortAlphabeticAsc).map(user =>
                                <div className={styles.optionsContainer} key={user.id}>
                                    <div className={styles.name_item}>
                                        <span>{user.name}</span>
                                    </div>
                                    <div className={styles.email_item}>
                                        <span>{user.email}</span>
                                    </div>
                                    <div className={styles.photo_url_item}>
                                        <img src={user.photoURL} alt='Foto del usuario' ></img>
                                    </div>
                                    <div className={styles.birdth_date_item}>
                                        <span>{dateToSpanishString(user.birthDate)}</span>
                                    </div>
                                    <div className={styles.phone_item}>
                                        <span>{user.phone}</span>
                                    </div>
                                    <div>
                                        {
                                            (user.admin)
                                                ? <span className={styles.icon} onClick={() => handleUpdateAdminStatus(user.id, user.admin)}><i className="fas fa-crown"></i></span>
                                                : <span className={styles.icon} onClick={() => handleUpdateAdminStatus(user.id, user.admin)}><i className="fas fa-user"></i></span>
                                        }
                                        {
                                            (user.active)
                                                ? <span className={styles.icon} onClick={() => handleUpdateActiveStatus(user.id, user.active)}><i className="far fa-eye"></i></span>
                                                : <span className={styles.icon} onClick={() => handleUpdateActiveStatus(user.id, user.active)}><i className="far fa-eye-slash"></i></span>
                                        }
                                        {/* <span className={styles.icon} onClick={() => handleUpdate(user)}><i className="fas fa-feather-alt"></i></span> */}
                                    </div>
                                </div>)

                        // <h1>Cargando...</h1>
                    }
                </div>

            </div>
        </React.Fragment>)
}

function MapStateToProps(state) {
    return {
        // state: state.brandsAndsCategories,
        usersState: state.usersManager,
        

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        updateUserById: (payload) => dispatch(updateUserById(payload))
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(UsersManager)