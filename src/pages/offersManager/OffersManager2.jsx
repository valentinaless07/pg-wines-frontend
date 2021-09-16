import Swal from 'sweetalert2';
import uniqid from 'uniqid';
import React, { useState, useRef } from 'react';
import Toggle from 'react-toggle';
import Moment from 'moment';
import './OffersManager2.css';
import styles from './OffersManager2.module.css';


const initialState = {
    status: false,
    image: '',
    categoryId: 0,
    productId: 0,
    discount: 0,
    from: null,
    until: null,
    slug: '',
}


const OffersManager2 = () => {
    const [formState, setFormState] = useState(initialState);
    let inputImage = useRef(null);
    let imageName = useRef(null);
    let fileName = useRef(null);
    let fileInput = useRef(null);




    const handleOnChange = (event) => {
        const elem = event.target;
        console.log({ target: elem, name: elem.name, type: elem.type });


        switch (true) {
            case (elem.type === 'select-one'):
                const name = event.target.options[event.target.selectedIndex].text;
                const value = event.target.options[event.target.selectedIndex].value;
                console.log('is a select', { select: name, value: value });

                setFormState({
                    ...formState,
                    [elem.name]: elem.value,
                });
                break;
            case (elem.type === 'date'):
                console.log('is a date', { date: elem.value });
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
                console.log('is a number', { discount: elem.value });
                break;
            case (elem.type === 'checkbox'):
                console.log('is a checkbox', { status: elem.checked });
                setFormState({
                    ...formState,
                    [elem.name]: elem.checked
                })
                break;
            case (elem.type === 'file'):                
                console.log('It is a file');
                console.log(elem.files[0]);
                let file = fileInput.current.files[0];
                if (file) {
                    fileName.current.value = file.name;
                }
                console.log('HOLA', file)

                // setFormState({
                //     ...formState,
                //     image: file,
                //     slug: file.name,
                // });
                break;


            default:
                break;
        }
    }

    const handleSave = (event) => {
        event.preventDefault();
        console.log('SAVE')
        let file = fileInput.current.files[0];

        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Cargar una imagen',
            });
            return;
        };

        setFormState({
            ...formState,
            image: file,
            slug: file.name,

        })
       
  
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

    const handleFileChange = (e) => {
        console.log('HANDLE_FILE_CHANGE')
        const file = fileInput.current.files[0];

        if (file) {
            fileName.current.value = file.name;
        }
    }


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
                    <form className={styles.form}>
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
                            <input type="date" id="from" name="from" max="2021-09-15" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="until">Until</label>
                            <input type="date" id="until" name="until" onChange={handleOnChange} />
                        </div>

                        <div>
                            <label htmlFor="categoryId">Categoría</label>
                            <select name="categoryId" style={{ width: '231px', height: '25,56px' }} placeholder="Seleccionar categoria" id="categoryId" value={formState.categoryId} onChange={handleOnChange}>
                                <option>Seleccionar categoría</option>
                                <option value='11' >Vinos</option>
                                <option value='22' >Cervezas</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="productId">Producto</label>
                            <select name="productId" style={{ width: '231px', height: '25,56px' }} placeholder="Seleccionar producto" id="productId" value={formState.productId} onChange={handleOnChange}>
                                <option>Seleccionar producto</option>
                                <option value='1' >Merlot</option>
                                <option value='2' >Vino patero oloroso</option>
                            </select>
                        </div>
                        <div>
                            {/* <label htmlFor="image">Image</label>
                            <input type="file" id="image" name="image" onChange={handleOnChange} /> */}

                            {/* <button style={{ display: 'block', width: '180px', height: '20px' }} onClick={handleOnClickUploadImage}>Seleccionar imagen</button>
                            <input type="text" id="imageName" name="imageName" ref={imageName} placeholder="Nombre de la foto"  />

                            <input ref={inputImage} type='file' value='' id="image" style={{ display: 'none' }} onChange={handleImageChange}></input> */}
                            <input type="text" id="fileName" name="fileName" ref={fileName} placeholder="Nombre de la foto" className={styles.file_name_input} />
                            <input
                                value={''}
                                ref={fileInput}
                                id="fileInput"
                                name="fileInput"
                                type="file"
                                style={{ display: 'none' }}
                                // onChange={handleOnChange}
                            onChange={handleFileChange}
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
                    </form>


                </div>
                <div className={styles.info_container}>
                    Data
                </div>
            </div>
        </div>
        // <div>
        //     <div>
        //         <label htmlFor="from">From</label>
        //         <input type="date" name="from" />
        //     </div>

        //     <div>
        //         <Toggle
        //             defaultChecked={formState.toggle}
        //             onChange={handleToggle} />
        //         <span>Wrapper label tag</span>
        //     </div>
        // </div>
    )
}

export default OffersManager2;
