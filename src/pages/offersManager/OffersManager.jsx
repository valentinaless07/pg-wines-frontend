import Swal from 'sweetalert2';
import uniqid from 'uniqid';
import React, { useRef, useEffect, useState } from 'react';
import styles from './OffersManager.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOffers, postOffers, } from '../../redux/actions/offersManagerActions';
import { getAllProductsSlider } from '../../redux/actions/manageProductsActions';
import OfferItem from '../../components/offerItem/OfferItem';
import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';

const initialState = {
    status: false,
    slug: '',
    productId: '',
}


const OffersManager = ({ offersState, getOffers, postOffers, getAllProductsSlider, productState, }) => {
    const [formState, setFormState] = useState(initialState);
    const offers = offersState.offers;
    let fileInput = useRef(null);
    let fileName = useRef(null);

    useEffect(() => {
        getOffers();
        getAllProductsSlider();
    }, [getOffers, getAllProductsSlider]);


    const handleOnChange = (event) => {
        // event.preventDefault();
        let value = event.target.value;
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        let productName = null;
        if (event.target.type === 'select-one' && event.target.name === 'productId') {
            // productName = event.target.options[0].text;
            productName = event.target.options[event.target.selectedIndex].text;

            setFormState({
                ...formState,
                slug: productName
            });
        }

        setFormState({
            ...formState,
            [event.target.name]: value,
            slug: productName
        });

    }

    const handleSave = () => {
        let file = fileInput.current.files[0];

        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Cargar una imagen',
            });
            return;
        };

        if (document.getElementById('productId').selectedIndex === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Seleccionar un producto',
            });
            return;
        };

        if (!file) return;
        postOffers(file, formState.slug, formState.productId, formState.status);

        fileInput.current.value = '';
        fileName.current.value = '';
        document.getElementById('status').selectedIndex = 0;
        setFormState(initialState);
    }

    const handlePhotoUpload = () => {
        fileInput.current.click();
    }

    const handleFileChange = (e) => {
        const file = fileInput.current.files[0];

        if (file) {
            fileName.current.value = file.name;
        }
    }

    return (
        <div className={styles.container}>

            {
                offersState.fetching &&
                <div className={styles.spinner_container} >
                    <img src={spinner} width="200px" alt="loading..." />
                </div>
            }

            <Link to="/" className={styles.backicon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>

            <div className={styles.title}>
                <h1>Gestion Offertas</h1>
            </div>

            <div className={styles.cart_container}>
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
                            <div key={uniqid()} className={styles.cart_items_container}>
                                <div className={styles.cart_items}>
                                    <OfferItem offer={offer} />
                                </div>
                            </div>
                        )))
                        : <div className={styles.offers_empty}>No hay imagenes cargadas en la base de datos...</div>
                }

            </div>

            <div className={styles.form_main_container}>
                <div className={styles.form_container}>
                    <div>
                        <select name="status" style={{ width: '231px', height: '25,56px' }} onChange={handleOnChange} placeholder="Visible" id="status" value={formState.status} >
                            <option value={false}>No visible</option>
                            <option value={true}>Visible</option>
                        </select>
                        <select name="productId" style={{ width: '231px', height: '25,56px' }} placeholder="Seleccionar producto" id="productId" value={formState.productId} onChange={handleOnChange}>
                            <option>Seleccionar producto</option>
                            {
                                (productState && productState.length > 0) 
                                ? productState?.map(product => (
                                    <option key={uniqid()} value={product.id}>{product.name}</option>
                                ))
                                : <option  value='Product not found'></option>
                            
                            }
                        </select>
                    </div>
                    <div>
                        <input type="text" id="fileName" name="fileName" ref={fileName} placeholder="Nombre de la foto" className={styles.file_name_input} />
                        <input
                            value={formState.file}
                            ref={fileInput}
                            id="fileInput"
                            name="fileInput"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button onClick={handlePhotoUpload} className={styles.buttom}>Cargar Imagen</button>
                        <button
                            onClick={handleSave}
                            className={styles.buttom} >
                            Guardar
                        </button>
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOffers: () => dispatch(getOffers()),
        postOffers: (file, slug, productId, status) => dispatch(postOffers(file, slug, productId, status)),
        getAllProductsSlider: () => dispatch(getAllProductsSlider()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersManager);

