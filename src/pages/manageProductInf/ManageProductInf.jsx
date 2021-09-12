export default function manageProductInf(){

    function prueba(){
        return(<div>Probando algo nuevo</div>)
    }
    return(
        <div>
            <div>
                <i className="fas fa-wine-bottle"></i>
                <span>Agregar nueva categoria</span>
            </div>
            <div>
                <i className="fab fa-penny-arcade"></i>
                <span>Agregar marca de producto</span>
            </div>
            {prueba()}
        </div>
    )
}