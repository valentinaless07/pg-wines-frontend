import Swal from 'sweetalert2';
import uniqid from 'uniqid';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';
import moment from 'moment';
import './OffersManager2.css';
// import spinner from '../../assests/images/spinnerLargeBkTransparent.svg';
import { getOffers, postOffers, } from '../../redux/actions/offersManagerActions';
import { getAllProductsSlider, getCategories } from '../../redux/actions/manageProductsActions';
import styles from './OffersManager2.module.css';


const initialState = {
    status: false,
    image: '',
    categoryId: 1,
    // productId: 0,
    discount: 25,
    from: '',
    until: '',
    slug: '',
}


const OffersManager2 = ({ offersState, getOffers, postOffers, getAllProductsSlider, productState, getCategories, categoriesState }) => {
    const [formState, setFormState] = useState(initialState);
    // let inputImage = useRef(null);
    // let imageName = useRef(null);
    let fileName = useRef(null);
    let fileInput = useRef(null);
    const now = new Date();
  

    
    const dateToString = (date) =>{
        
        let result = '';
        result+= date.getFullYear();
        if(date.getMonth() <10){
            result+= '-0' + (date.getMonth() + 1);
        }else{
            result+= '-' + (date.getMonth() + 1);
            
        }
        
        result+= '-' + date.getDate();
        return result;
    }
    
   useEffect(()=>{
    setFormState({
        ...formState,
        form: now
    });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

    useEffect(() => {
        
        getOffers();
        getCategories();
    }, [getOffers, getCategories]);



    const handleOnChange = (event) => {
        const elem = event.target;
        console.log({ target: elem, name: elem.name, type: elem.type });


        switch (true) {
            case (elem.type === 'select-one'):
                // const name = event.target.options[event.target.selectedIndex].text;
                // const value = event.target.options[event.target.selectedIndex].value;

                setFormState({
                    ...formState,
                    [elem.name]: elem.value,
                });
                break;
            case (elem.type === 'date'): 
                if(elem.name === 'from'){
                    console.log('FROM', elem.value);
                    const from = new Date(elem.value);
                    console.log({from: Date.parse(from), now: Date.parse(now)})
                    if(Date.parse(from) < Date.parse(now)){
                        console.log('from tiene que se mayor que hoy')
                    }
                }                
                if(elem.name === 'until'){
                    console.log('UNTIL', elem.value)
                }                
                setFormState({
                    ...formState,
                    [elem.name]: elem.value,
                })
                break;
            case (elem.type === 'number'):
                setFormState({
                    ...formState,
                    discount: elem.value
                })
                break;
            case (elem.type === 'checkbox'):
                setFormState({
                    ...formState,
                    [elem.name]: elem.checked
                })
                break;
            case (elem.type === 'file'):
                console.log('It is a file');
                console.log('FILES: ',elem.files[0]);
                let file = fileInput.current.files[0];
                if (file) {
                    fileName.current.value = file.name;
                }

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
        // let file = fileInput.current.files[0];
        console.log(formState)
        const { status, slug, image, categoryId, from, until, discount } = formState;
        switch (true) {
            case (discount <= 0):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Ingresar un descuento para la categoría.', });
                break;
            case (!until):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Seleccionar una fecha de fin.', });
                break;
            case (categoryId <= 0):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Seleccionar una categoría.', });
                break;
            case (!image):
                Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Cargar una imagen.', });
                break;

            default:
                postOffers(formState, formState.image)
                break;
        }

    }

    // const handleOnClickUploadImage = (event) => {
    //     // document.getElementById('image').click()
    //     inputImage.current.click();
    // }
    // const handleImageChange = (event) => {

    //     const file = inputImage.current?.files[0];
    //     console.log('file: ', file)
    //     // imageName = inputImage.current?.files[0]?.name;
    //     // console.log('fileName: ', imageName)


    //     if (file) {
    //         imageName.current.value = file.name;
    //         setFormState({
    //             ...formState,
    //             image: file,
    //             slug: imageName,
    //         })

    //     }
    // }


    // const handlePhotoUpload = () => {
    //     fileInput.current.click();
    // }

    // const handleFileChange = (e) => {
    //     const file = fileInput.current.files[0];
    //     console.log('HANDLE_FILE_CHANGE', { file: fileInput.current.files[0], formState })

    //     if (file) {
    //         fileName.current.value = file.name;
    //     }

    // }


    const handlePhotoUpload = () => {
        fileInput.current.click();
    }
    // const handleFileChange = (e) => {
    //     const file = fileInput.current.files[0];

    //     if (file) {
    //         fileName.current.value = file.name;
    //     }
    // }

    return (

        <div className={styles.flex_main_container}>
            <div className={styles.header_container}>
                <span>Back</span>
                <span>Offers Manager</span>
                <span>.</span>
            </div>
            <div className={styles.data_container}>
                <div className={styles.sidebar_container}>
                    Sidebar
                    <div className={styles.form}>
                        <div id="status_descuento_container" className={styles.status_descuento_container}>
                            <div>
                                <label htmlFor="status">Status</label>
                                <Toggle name="status" id="status" defaultChecked={formState.toggle} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="discount">Descuento</label>
                                <input type="number" name="discount" value={formState.discount} onChange={handleOnChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="from">From</label>
                            <input type="date" id="from" name="from" value={dateToString(now)} min={dateToString(now)} max={dateToString(now)} onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="until">Until</label>
                            <input type="date" id="until" name="until" value={formState.until} min={dateToString(now)}  onChange={handleOnChange} />
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
                                {/* <option value='11' >Vinos</option>
                                <option value='22' >Cervezas</option> */}
                            </select>
                        </div>
                      
                        <div>                         
                            <input type="text" id="fileName" name="fileName"  disabled ref={fileName} placeholder="Nombre de la foto" className={styles.file_name_input} />
                            <input
                                value={formState.file}
                                ref={fileInput}
                                id="fileInput"
                                name="fileInput"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleOnChange}
                            // onChange={handleFileChange}
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
                    Data
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersManager2);


