import Swal from 'sweetalert2';
import uniqid from 'uniqid';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';
import { getOffers, postOffers, deleteOfferById, updateOfferById } from '../../redux/actions/offersManagerActions';
import { getAllProductsSlider, getCategories } from '../../redux/actions/manageProductsActions';
import { dateToString, sumToDate, dateToSpanishString } from '../../helpers/helpers';
import AdminAreaNavbar from "../../components/adminAreaNavbar/AdminAreaNavbar"
import styles from './OffersManager.module.css';
import './OffersManager.css';

const initialState = {
    status: false,
    image: '',
    categoryId: 0,
    discount: 10,
    from: '',
    until: '',
    slug: '',
}


const OffersManager2 = ({ offersState, getOffers, postOffers, getAllProductsSlider, productState, getCategories, categoriesState, deleteOfferById, updateOfferById }) => {
    const offers = offersState.offers;
    const [formState, setFormState] = useState(initialState);
    let fileName = useRef(null);
    let fileInput = useRef(null);
    const now = new Date();

    useEffect(() => {
        setFormState({
            ...formState,
            from: dateToString(now),
            until: dateToString(now)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getOffers();
        getCategories();

    }, [getOffers, getCategories]);


    const handleOnChange = (event) => {
        const elem = event.target;

        switch (true) {
            case (elem.type === 'select-one'):
                // const name = event.target.options[event.target.selectedIndex].text;
                // const value = event.target.options[event.target.selectedIndex].value;

                setFormState({
                    ...formState,
                    [elem.name]: elem.value.toString(),
                });
                break;
            case (elem.type === 'date'):
                setFormState({
                    ...formState,
                    [elem.name]: elem.value,
                })
                break;
            case (elem.type === 'number'):
                if (elem.value < 10 || elem.value > 70) {
                    Swal.fire({ icon: 'warning', text: 'El descuento debe ser entre el 10 y el 70 %' })
                    return;
                }
                setFormState({
                    ...formState,
                    discount: elem.value.toString()
                });
                break;
            case (elem.type === 'checkbox'):
                setFormState({
                    ...formState,
                    [elem.name]: elem.checked.toString()
                })
                break;
            case (elem.type === 'file'):
                let file = fileInput.current.files[0];
                if (file) fileName.current.value = file.name;

                setFormState((oldState) => {
                    return {
                        ...oldState,
                        image: file,
                        slug: file.name,
                    }
                });
                break;

            default:
                break;
        }
    }

    const handleSave = (event) => {
        const { image, categoryId, discount } = formState;

        switch (true) {
            case (discount <= 0):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Ingresar un descuento para la categoría.', });
                break;

            case (categoryId <= 0):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Seleccionar una categoría.', });
                break;

            case (!image):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Cargar una imagen.', });
                break;

            default:
                postOffers(formState)
                break;
        }
    }

    const handlePhotoUpload = () => {
        fileInput.current.click();
    }

    const handleDelete = (id) => {
        deleteOfferById(id);
    }

    const handleChangeStatus = (id, status) => {
        updateOfferById(id, !status);
    }

    const getCategoryById = (idCategory) => {
        if (!categoriesState) return;
        const category = categoriesState?.filter(category => category.id === idCategory);
        const result = category[0]?.name;
        return result;
    }

    return (
        <div className={styles.flex_main_container}>
            <AdminAreaNavbar/>

            {/* <div className={styles.header_container}>
               
                <div className={styles.title}>
                    <h1>Gestión de Ofertas</h1>
                </div>
              
            </div> */}
            <div className={styles.data_container}>
                {
                    offersState.fetching &&
                    <div className={styles.spinner_container} >
                        <img src={spinner} width="200px" alt="loading..." />
                    </div>
                }
                <div className={styles.sidebar_container}>
                    <div className={styles.form}>
                        <div id="status_descuento_container" className={styles.status_descuento_container}>
                            <div>
                                <label htmlFor="status">Status</label>
                                <Toggle name="status" id="status" defaultChecked={formState.toggle} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="discount">Descuento</label>
                                <input type="number" min="10" max="70" name="discount" value={formState.discount} onChange={handleOnChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="from">Inicio</label>
                            <input type="date" id="from" name="from" value={dateToString(now)} min={dateToString(now)} max={dateToString(now)} onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="until">Fin</label>
                            <input type="date" id="until" name="until" value={formState.until} min={sumToDate(now, 1)} onChange={handleOnChange} />
                        </div>

                        <div>
                            <label htmlFor="categoryId">Categoría</label>
                            <select name="categoryId" style={{ width: '231px', height: '25,56px' }} placeholder="Seleccionar categoria" id="categoryId" value={formState.categoryId} onChange={handleOnChange}>
                                <option>Seleccionar categoría</option>
                                {
                                    categoriesState.map(category => (
                                        <option key={uniqid()} value={category.id} > {category.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <input type="text" id="fileName" name="fileName" disabled ref={fileName} placeholder="Nombre de la foto" className={styles.file_name_input} />
                            <input
                                value={formState.file}
                                ref={fileInput}
                                id="fileInput"
                                name="fileInput"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleOnChange}

                            />
                            <button onClick={handlePhotoUpload} className={styles.buttom}>Cargar Imagen</button>
                        </div>
                        <div>
                            <button
                                onClick={handleSave}
                                className={styles.buttom} >
                                Guardar
                            </button>
                        </div>
                    </div>


                </div>
                <div className={styles.info_container}>

                    <div className={styles.card_container}>
                        {
                            (offers.length > 0)
                                ?
                                (offers?.sort((a, b) => {
                                    if (a.id < b.id) {
                                        return 1;
                                    } else if (a.id > b.id) {
                                        return -1;
                                    }
                                    return 0;
                                }).map(offer => (
                                    <div key={uniqid()} className={styles.card}>
                                        <div>
                                            <img src={offer.image} alt="" style={{ width: '300px', height: '25,56px' }} />
                                        </div>
                                        <div className={styles.card_info}>
                                            <span>Inicio: {dateToSpanishString(offer.from)}</span>
                                            <span>Fin: {dateToSpanishString(offer.until)}</span>
                                        </div>
                                        <div className={styles.card_info}>
                                            <span>Categoría: {getCategoryById(offer.categoryId)}</span>
                                            <span>% {offer.discount}</span>
                                        </div>

                                        <div className={styles.card_status_delete}>
                                            {
                                                (offer.status)
                                                    ? <i onClick={(id) => handleChangeStatus(offer.id, offer.status)} className="fas fa-eye fa-2x" ></i>
                                                    : <i onClick={(id) => handleChangeStatus(offer.id, offer.status)} className="fas fa-eye-slash fa-2x" ></i>
                                            }
                                            <i onClick={(id) => handleDelete(offer.id)} className="fas fa-trash-alt fa-2x" ></i>
                                        </div>


                                    </div>

                                )))
                                : <div className={styles.offers_empty}>No hay imagenes cargadas en la base de datos...</div>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        offersState: state.offers,
        authState: state.auth,
        productState: state.manageProducts.products,
        categoriesState: state.manageProducts.categories,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOffers: () => dispatch(getOffers()),
        getCategories: () => dispatch(getCategories()),
        // postOffers: (file, slug, productId, status) => dispatch(postOffers(file, slug, productId, status)),
        postOffers: (file, slug, formState) => dispatch(postOffers(file, slug, formState)),
        getAllProductsSlider: () => dispatch(getAllProductsSlider()),
        deleteOfferById: (id) => dispatch(deleteOfferById(id)),
        updateOfferById: (id, status) => dispatch(updateOfferById(id, status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersManager2);


