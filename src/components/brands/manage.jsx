// import { connect } from "react-redux"
// import { deleteElement } from "../../redux/actions/brandsAndCategories"

// function Manage({regEx, state, element, deleteElement}){

//     let prueba= regEx

//     const [search, setSearch] = useState({
//         name: ''
//     })

//     function handleRegex(e){
//         setSearch({
//             ...search,
//             name: e.target.value
//         })
//     }

//     function handleCreate(){
//         if(search.name!==''){
//             createElement(element, search)
//         }
//     }

//     <span>Search</span><input onChange={handleRegex} value={search.name} type='text'/>
//     <button onClick={handleCreate}>{`Crear`}</button>

//     function filter({name}){
//         let regEx = new RegExp(`${prueba}`,'gi')
//         // if(regEx.test(name)){
//         //     return true
//         // }
//         // return false
//         return regEx.test(name)
//     }

//     function handleDelete({id}){
//         console.log({id})
//         deleteElement(element,{id})
//     }

//     return(<div>
//         <div>
//             <ul>
//                 {
//                     state.length>0?state.filter(item=>filter(item)).map(item=><li key={item.id}>{item.name}<span onClick={()=>handleDelete(item)}><i className="far fa-trash-alt"></i></span></li>)
//                     :
//                     <h1>Cargando...</h1>
//                 }
//             </ul>

//         </div>
//         <div>

//         </div>
//     </div>)
// }

// export default connect(null, {deleteElement})(Manage)