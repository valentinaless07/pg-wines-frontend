import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import styles from './Packing.module.css'
import AdminAreaNavbar from "../../components/adminAreaNavbar/AdminAreaNavbar"
import { getPacking } from "../../redux/actions/manageProductsActions"
import { createPacking } from "../../redux/actions/manageProductsActions"
import { useHistory } from "react-router"
import { deletePacking } from "../../redux/actions/manageProductsActions"
import { updatePacking } from "../../redux/actions/manageProductsActions"

function Packing({getPacking, packing, createPacking, deletePacking, updatePacking}){
    
    const history = useHistory()
    const [search, setSearch] = useState({
        name: ''
    })
    
    
    
    
    useEffect(()=>{
        getPacking()
    },[getPacking])
    
  

    function handleRegex(e){
        setSearch({
            ...search,
            name: e.target.value
        })
    
    }

   async function handleCreate() {
        if(search.name.length > 0){
            await createPacking(search.name)
            await Swal.fire('Nuevo Packing Creado!')
            history.go(0)
        }
   }
         
   async function handleDelete(id) {
    await deletePacking(id)
    await Swal.fire('Packing Eliminado!')
    history.go(0)
   }

   async function handleUpdate(item) {
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
                await updatePacking(item)
            }else{
                Swal.showValidationMessage('El campo no puede estar vacío')
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            
          Swal.fire({
            title: `Actualización exitosa`,
          })
          history.go(0)
        }
      })
   }
      
    return(
    <React.Fragment>
            <AdminAreaNavbar/>
        <div className={styles.admin}>

        <h1>Packing</h1>
        <div className={styles.form}>
        <input className={styles.inputSearch} placeholder='Nombre del producto'  onChange={handleRegex} type='text'/>
            <button onClick={handleCreate} className={styles.btnCreate}>{`CREAR`}</button>
            </div>
        
        <div className={styles.infoContainer}>
                {
                    packing.length > 0 ? packing.map(item=><div className={styles.optionsContainer} key={item.id}>
                            <div>
                                <span>{item.name}</span>
                            </div>
                            <div>
                                <span className={styles.icon} onClick={() => handleDelete(item.id)}><i className="far fa-trash-alt"></i></span>
                                <span className={styles.icon} onClick={() => handleUpdate(item)} ><i className="fas fa-feather-alt"></i></span>
                            </div>
                        </div>)
                    :
                    <h1>Cargando...</h1>
                }
        </div>

    </div>
    </React.Fragment>)
}

const mapStateToProps = (state) => {
    return {
      packing: state.manageProducts.packing,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
      getPacking: () => dispatch(getPacking()),
      createPacking: (payload) => dispatch(createPacking(payload)),
      deletePacking: (id) => dispatch(deletePacking(id)),
      updatePacking: (item) => dispatch(updatePacking(item))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Packing)