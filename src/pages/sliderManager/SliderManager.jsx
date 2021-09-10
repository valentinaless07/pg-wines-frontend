import React, { useRef } from 'react'
import styles from './SliderManager.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSliderImagesAction } from '../../redux/actions/sliderManagerActions';
import SliderItem from '../../components/sliderItem/SliderItem';

// productId
// status
// image

const SliderManager = ({ sliderState, authState, getImages }) => {
    const sliderList = sliderState.sliderList;
    // const today = moment().format("MMM Do YYYY");
    // const dispatch = useDispatch();
    // const activeNote: any = useSelector((state: IRootState) => state.notes.active);
    // const fileInput = useRef(null);
    console.log(sliderList);
    console.log('length: ', sliderList.length)


    // const handleSave = () => {
    //     // dispatch(startSaveNote(activeNote));
    //     console.log('save file')
    // }

    // const handlePictureClick = () => {
    //     fileInput.current.click();
    // }

    // const handleFileChange = (e) => {
    //    const file = e.target.files[0];
    //    console.log('files: ', e.target.files);
    //     if(file){
    //         // dispatch(startUploading(file));
    //         console.log('selected file: ', file)
    //     }
    // }



    return (
        <div className={styles.container}>

            <Link to="/home" className={styles.backicon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>

            <div className={styles.title}>
                <h1>Gestion Imagenes Slider</h1>
            </div>

            <div className={styles.cart_container}>
                {
                    (sliderList)
                        ?
                        <div className={styles.cart_items_container}>
                            <div className={styles.cart_items}>
                                <SliderItem />
                            </div>
                        </div>

                        : <div className={styles.carritoVacio}>No hay imagenes cargadas en la base de datos...</div>
                }
            </div>
            <div className={styles.insert_item}>               
                <div>
                    <label htmlFor="item">Buscar imagen</label>
                    <input type="text" value="SADFASDF"></input>
                </div>
                <div>
                    <label for="vehicle1">Status</label><br />
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                </div>
                <div>
                <button>Cargar Imagen</button>
                </div>
            </div>

        </div>

        // <div className={styles.main_container}>
        //    <div className={styles.container}>
        //     <div className={styles.slider}>
        //         This is the slider
        //     </div>
        //     <form action="">
        //         <input type="text" value="Insert file"  />
        //         <button  >Upload File</button>
        //     </form>

        //     <form action="">
        //         <label for="photos">Seleccionar una foto</label>


        //         <select name="photos" placeholder="Seleccionar una foto" >
        //             <option value="foto1" >Foto1</option>
        //             <option value="foto2" >Foto2</option>
        //             <option value="foto3" >Foto3</option>
        //         </select>
        //     </form>
        //    </div>
        // </div>

        // Prueba 2
        //  <div className="notes__appbar" >
        //     <span>Hoy</span>
        //     <input
        //         ref={fileInput}
        //         id="fileSelector"
        //         name="file"
        //         type="file"
        //         style={{ display: 'none' }}
        //         onChange={handleFileChange}
        //     />
        //     <div>

        //         <button className="btn"  onClick={handlePictureClick}>
        //             Picture
        //         </button>

        //         <button
        //             className="btn"
        //             onClick={handleSave}
        //         >
        //             Save
        //         </button>

        //     </div>
        // </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sliderState: state.slider,
        authState: state.auth,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImages: () => dispatch(getSliderImagesAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderManager);

