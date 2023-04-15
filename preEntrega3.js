let productos = [
    { id: 1, nombre: "Arroz Chow Fan", categoria: "arroz", precio: 10, img: "./img/chaufan2023.png" },
    { id: 2, nombre: "Aeropuerto", categoria: "arroz", precio: 15, img: "./img/aeropuerto.png" },
    { id: 3, nombre: "Chancho Asado", categoria: "especiales", precio: 25, img: "./img/ChanchoAsado.png" },
    { id: 4, nombre: "Chancho Cruyoc", categoria: "especiales", precio: 27, img: "./img/chanchoCruyoc.png" },
    { id: 5, nombre: "Chancho Kintu", categoria: "especiales", precio: 30, img: "./img/chanchoKintu.png" },
    { id: 6, nombre: "Chi Jau Kay", categoria: "especiales", precio: 30, img: "./img/chijaukay.png" },
    { id: 7, nombre: "Fideo Saltados", categoria: "fideos", precio: 20, img: "./img/fideos2023.png" },
    { id: 8, nombre: "Kam Lu Wantan", categoria: "especiales", precio: 28, img: "./img/especial2023.png" },
    { id: 9, nombre: "Ensalada Fansi", categoria: "ensaladas", precio: 20, img: "./img/ensalada_Fansi.png" },
    { id: 10, nombre: "Pollo con Verduras", categoria: "arroz", precio: 22, img: "./img/pollocverdura.png" },
    { id: 11, nombre: "Saho Fan", categoria: "arroz", precio: 24, img: "./img/sahofan.png" },
    { id: 12, nombre: "Sopa FuchiFu", categoria: "sopas", precio: 22, img: "./img/SopaFuchifu.png" }]

let carrito = JSON.parse(localStorage.getItem("carrito")) || []
renderizarCarrito(carrito)
renderizarProductos(productos)
let inputs = document.getElementsByClassName("checks")
console.log(inputs)
for (const ind of inputs) {
    ind.addEventListener("click", filtrarCategoria)
}

function filtrarCategoria(e) {
    console.log(e.target.id)
    let filtros = []
    for (const ind of inputs) {
        console.log(ind.checked)
        console.log(ind.id)
        if (ind.checked) {
            filtros.push(ind.id)
        }
    }
    console.log(filtros)
    let arrayFiltrado = productos.filter(producto => filtros.includes(producto.categoria))
    if (arrayFiltrado.length > 0) {
        renderizarProductos(arrayFiltrado)
    } else {
        renderizarProductos(productos)
    }
}

function renderizarProductos(arrayProductos) {
    let contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""
    arrayProductos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaProducto"
        tarjetaProducto.innerHTML = `
            <h2 class=titleproduct> ${producto.nombre} </h2>
            <p>Sección: ${producto.categoria.toUpperCase()}</p>
            <img src=${producto.img}>
            <h3>PRECIO: $ ${producto.precio}</h3>
            <button id=${producto.id}>AGREGAR AL CARRITO</button>
            `
        contenedor.appendChild(tarjetaProducto)
        let boton = document.getElementById(producto.id)
        boton.addEventListener("click", agregarProductoAlCarrito)

    })
}

function agregarProductoAlCarrito(e) {
    console.log(e.target.id)
    let productoBuscado = productos.find(producto => producto.id ===
        Number(e.target.id))
    if (carrito.some(producto => producto.id === productoBuscado.id)) {
        Swal.fire('Por favor usar el boton +')
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precio: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function renderizarCarrito(arrayProductos) {
    let carritoDOM = document.getElementById("carrito")
    carritoDOM.innerHTML = `
    <h2> Carrito </h2>
    <div class=nombres>
    <h3>Nombre</h3>
    <h3>Precio Unidad</h3>
    <h3>Cantidad</h3>
    <h3>-----</h3>
    <h3>Subtotal</h3> </div> `
    arrayProductos.forEach(producto => {
        carritoDOM.className = "tabla"
        carritoDOM.innerHTML += `
        <div class=orden> 
        <p>${producto.nombre}</p> 
        <p>${producto.precio}</p> 
        <p>${producto.unidades}</p>
        <button id=${producto.id} class=botoncarrito>+</button>
        <p>${producto.subtotal}</p>
        </div> `
    })
    let botonAgregar = document.getElementById(carritoDOM.id)
    botonAgregar.addEventListener("click", aumentarCantidad)
}

function aumentarCantidad(e) {
    console.log(e.target.id)
    let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
    let posicion = carrito.findIndex(producto => producto.id === productoBuscado.id)
    carrito[posicion].unidades++
    carrito[posicion].subtotal = carrito[posicion].precio * carrito[posicion].unidades
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", terminarCompra)
function terminarCompra() {
    Swal.fire(
        'Gracias por su compra!',
        'Hasta luego',
        'success'
    )
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
    let carritoDOM = document.getElementById("carrito")
    carritoDOM.innerHTML = ""
}