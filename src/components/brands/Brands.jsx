import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getInfo, createElement, deleteElement } from "../../redux/actions/brandsAndCategories"

function BrandsAndCategories({state, element, getInfo, createElement, deleteElement}){
    
    const [search, setSearch] = useState({
        name: ''
    })

    useEffect(()=>{
        getInfo(element)
    },[search.name, element])

    function handleRegex(e){
        setSearch({
            ...search,
            name: e.target.value
        })
    }

    function handleCreate(){
        if(search.name!==''){
            createElement(element, search)
        }
        setSearch({
            name:''
        })
        getInfo(element)
    }

        function filter({name}){
        let regEx = new RegExp(`${search.name}`,'gi')
        return regEx.test(name)
    }

    function handleDelete({id}){
        console.log({id})
        deleteElement(element, {id})
    }
      
    return(
    <div>
        <h1>{element}</h1>
        <form onSubmit={handleCreate}>
            <span>Search</span><input onChange={handleRegex} value={search.name} type='text'/>
            <button>{`Crear`}</button>
        </form>

        <ul>
            {
                state[element].length>0?
                state[element].filter(item=>filter(item)).map(item=><li key={item.id}>{item.name}<span onClick={()=>handleDelete(item)}><i className="far fa-trash-alt"></i></span></li>)
                :
                <h1>Cargando...</h1>
            }
        </ul>

    </div>)
}

function MapStateToProps(state){
    return{
        state: state.brandsAndsCategories
    }
}

export default connect(MapStateToProps, {getInfo, createElement, deleteElement})(BrandsAndCategories)