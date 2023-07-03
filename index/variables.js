const card= document.querySelector("div.grid#lista-cursos")
const contenedorCarrito=document.querySelector(".buy-card .lista_de_cursos")
const vaciarCarritoBtn= document.querySelector("#vaciar_carrito")
const inputSearch= document.querySelector("input#inputSearch")
const URL="./cursos.json"
const arrayProductos=[]
function recuperarLS(){
    if (localStorage.getItem("miCarrito"))
       return JSON.parse(localStorage.getItem("miCarrito"))
    else
       return []
}
const arrayCarritoShop=recuperarLS()
