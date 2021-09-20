import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getInfo, createElement, deleteElement, updateElement } from "../../redux/actions/brandsAndCategories"
import Swal from "sweetalert2"
import styles from './brands.module.css'
import { useLocation } from "react-router"
import AdminAreaNavbar from "../adminAreaNavbar/AdminAreaNavbar"

function BrandsAndCategories({state, getInfo, createElement, deleteElement, updateElement}){
    
    const element = useLocation().search.split('=').slice(-1)[0]

    const [search, setSearch] = useState({
        name: ''
    })
    
    
    useEffect(()=>{
        getInfo(element)
    },[search.name, element, getInfo])
    
    function handleRegex(e){
        setSearch({
            ...search,
            name: e.target.value
        })
    }


    function handleCreate(){
        if(search.name!==''){
            createElement(element, search)
            Swal.fire({
                title: `${search.name} creado satisfactoriamente`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              }).then(()=>{
                  getInfo(element)
              })
        }
        setSearch({
            name:''
        })
    }

        function filter({name}){
        let regEx = new RegExp(`${search.name}`,'gi')
        return regEx.test(name)
    }

    function handleDelete(id){
        Swal.fire({
            title: '¿Esta Seguro?',
            text: "no podras deshacer esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, seguro'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteElement(element, id)
                Swal.fire(
                    'Eliminado'
                    ).then(()=>{                        
                        getInfo(element)
                    })
                }
            })
    }

    function handleUpdate(item){
        Swal.fire({
            title: `Actualizar ${item.name}`,
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            showLoaderOnConfirm: true,
            preConfirm: async (newValue) => {
                if(newValue!==''){
                    item.name=newValue
                    await updateElement(element, item)
                }else{
                    Swal.showValidationMessage('El campo no puede estar vacío')
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                getInfo(element)
              Swal.fire({
                title: `Actualización exitosa`,
              })
            }
          })
    }
      
    return(
    <React.Fragment>
            <AdminAreaNavbar/>
        <div className={styles.admin}>

        <h1>{element==='categories'? 'Categorias' : 'Marcas'}</h1>
        <form className={styles.form} onSubmit={handleCreate}>
            <span>Busqueda </span><input className={styles.inputSearch} placeholder='buscar' onChange={handleRegex} value={search.name} type='text'/>
            <button className={styles.btnCreate}>{`CREAR`}</button>
        </form>
        <div className={styles.infoContainer}>
                {
                    state[element].length>0?
                    state[element].filter(item=>filter(item)).map(item=><div className={styles.optionsContainer} key={item.id}>
                            <div>
                                <span>{item.name}</span>
                            </div>
                            <div>
                                <span className={styles.icon} onClick={()=>handleDelete(item.id)}><i className="far fa-trash-alt"></i></span>
                                <span className={styles.icon} onClick={()=>handleUpdate(item)}><i className="fas fa-feather-alt"></i></span>
                            </div>
                        </div>)
                    :
                    <h1>Cargando...</h1>
                }
        </div>

    </div>
    </React.Fragment>)
}

function MapStateToProps(state){
    return{
        state: state.brandsAndsCategories
    }
}

export default connect(MapStateToProps, {getInfo, createElement, deleteElement, updateElement})(BrandsAndCategories)