function cargarTienda(array){
    searchAddeventListener()
    card.innerHTML=""
    array.forEach(element => {
        card.innerHTML+=getCard(element)
    });
    registrarEventsListener()
    guardarCursos()
    btnBorrarCursoIndividual() 
}
function searchAddeventListener(){
    inputSearch.addEventListener("search",searchInput)
}
function searchInput(){
    let resultado = arrayProductos.filter((e)=>e.titulo.toLocaleLowerCase().includes(inputSearch.value.trim().toLocaleLowerCase()))
    if(resultado.length>0)
         cargarTienda(resultado)
 }
function btnVaciarCarrito(){
    vaciarCarritoBtn.addEventListener("click",()=>{ if (arrayCarritoShop.length > 0) {   
         localStorage.clear()
         location.reload()    
    }}) 
 }
function btnBorrarCursoIndividual(){
    localStorage.setItem("miCarrito",JSON.stringify(arrayCarritoShop))
    guardarCursos()
    const btnBorrarCurso= document.querySelectorAll("span.borrarCurso")
     for (let boton of btnBorrarCurso) {
            boton.addEventListener("click",(e)=>{
                const borrar=  arrayCarritoShop.find((producto)=>producto.id===parseInt(e.target.id))
                arrayCarritoShop.splice(borrar, 1)   
                localStorage.setItem("miCarrito",JSON.stringify(arrayCarritoShop))
                location.reload()
            }) }}
function getListaCarrito(dato){
                return `   <div> <img src="${dato.imagen}">
                            <p>"${dato.titulo}"</p>
                            <p>$${dato.descuento}</p>
                            <p>1</p>
                            <p><span class="borrarCurso" id="${dato.id}">X</span></p>
                            </div>`           
            }
function calcularPrecioTotal(){
                const totalprecio= document.querySelector("#total")
                const reducido= arrayCarritoShop.reduce((acumulador, valorActual)=>acumulador+valorActual.descuento,0)
                totalprecio.innerHTML= reducido
            }
function completarCompra(){
                calcularPrecioTotal()
                const btnCompletarCompra = document.querySelector("#comprarCarrito")
                btnCompletarCompra.addEventListener("click",()=>{
                    if (arrayCarritoShop.length>0) {
                        localStorage.clear()
                        alerta("Hecho","Compra realizada con exito", "success", 2000, true)
                        btnCompletarCompra.innerHTML="Gracias por tu compra!"
                        setTimeout(()=>{location.reload()}, 2500)
                       
                    }
                 })
            }
function getCard(dato){
                return `  <div class="items">
                                  <img id="imgId" src="${dato.imagen}">
                                   <div class="info">
                                 <h3>${dato.titulo} </h3>
                                 <p>${dato.profesor} </p>
                                 <div class="precio">
                                 <p>$${dato.precio}</p>
                                  <p class="descuento">$${dato.descuento}</p>
                                   </div>
                                   <button id="${dato.id}"class="button">Agregar al Carrito</button>
                          </div>`       
                  }
function registrarEventsListener(){
                    const btnAdd=document.querySelectorAll("button.button");
                    for (let button of btnAdd){
                        button.addEventListener("click", (e)=>{
                            const agregarInfo= arrayProductos.find((producto)=>producto.id===parseInt(e.target.id))
                            arrayCarritoShop.push(agregarInfo)
                           localStorage.setItem("miCarrito",JSON.stringify(arrayCarritoShop))
                           guardarCursos()
                           alerta("Hecho","Curso agregado", "success",1500, true)
                    })}
                }
function guardarCursos(){
                    contenedorCarrito.innerHTML = "";
                    arrayCarritoShop.forEach(element => {
                        contenedorCarrito.innerHTML+=getListaCarrito(element)
                    completarCompra()
                    }) 
                }
function obtenerCursos(){
    fetch(URL)
        .then((respuesta)=>respuesta.json())
        .then((data)=> arrayProductos.push(...data))
        .then(()=>cargarTienda(arrayProductos))
}

function alerta(titulo, texto, icono,tiempo, carga){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        timer: tiempo,
        timerProgressBar:carga,
        showConfirmButton:false
      })
}