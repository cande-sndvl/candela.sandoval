// ----------------------
// Datos y variables
// ----------------------
const nombreTienda = "Trendy Sneakers";
let carrito = [];
let nombreUsuario = localStorage.getItem("nombreUsuario") || "";

// Lista de zapatillas
const zapatillas = [
  { id: 1, marca: "Nike", modelo: "Nike V2K", precio: 145000, talles: [38,39,40,41,42], img:"./assetss/Nike V2K Run.webp" },
  { id: 2, marca: "Nike", modelo: "Nike Jordan", precio: 140000, talles: [38,39,40,41,42], img:"./assetss/Nike Cortez SE.webp" },
  { id: 3, marca: "Nike", modelo: "Nike LD-1000", precio: 150000, talles: [38,39,40,41,42], img:"./assetss/Nike LD-1000.webp" },
  { id: 4, marca: "Nike", modelo: "Nike P-6000", precio: 200000, talles: [37,38,39,40], img:"./assetss/Nike P-6000.webp" },
  { id: 5, marca: "Puma", modelo: "RS-X", precio: 160000, talles: [37,38,39,40], img:"./assetss/FENTY x PUMA x SMURFS Avanti.avif" },
  { id: 6, marca: "Puma", modelo: "Puma Speedcat", precio: 170000, talles: [37,38,39,40], img:"./assetss/Speedcat Glossy.avif" },
  { id: 7, marca: "Puma", modelo: "Puma ROCKY", precio: 180000, talles: [39,40,41,42,43], img:"./assetss/A$AP ROCKY x PUMA Mostro OG.avif" },
  { id: 8, marca: "Puma", modelo: "Puma Indoor", precio: 190000, talles: [37,38,39,40], img:"./assetss/Zapatillas King Indoor.avif" },
  { id: 10, marca: "Adidas", modelo: "Adidas Court Lo", precio: 170000, talles: [37,38,39,40], img:"./assetss/adidascourtLo.png" },
  { id: 11, marca: "Adidas", modelo: "Adidas Gazelle Lo", precio: 180000, talles: [37,38,39,40], img:"./assetss/adidasGazelleLo.png" },
  { id: 12, marca: "Adidas", modelo: "Adidas SL72", precio: 190000, talles: [37,38,39,40], img:"./assetss/adidasSL72.png" },
  { id: 13, marca: "Adidas", modelo: "Adidas Taekwondo", precio: 160000, talles: [37,38,39,40], img:"./assetss/adidasTaekwondo.png" },
  { id: 14, marca: "New Balance", modelo: "New Balance 1906R", precio: 180000, talles: [37,38,39,40], img:"./assetss/new balance 1906.webp" },
  { id: 15, marca: "New Balance", modelo: "New Balance 2002R", precio: 189000, talles: [37,38,39,40], img:"./assetss/new balance 2002R.webp" },
  { id: 16, marca: "New Balance", modelo: "New Balance 550", precio: 180000, talles: [37,38,39,40], img:"./assetss/new balance 550.webp" },
  { id: 17, marca: "New Balance", modelo: "New Balance 650", precio: 190000, talles: [37,38,39,40], img:"./assetss/new balance 650.webp" }
];

// ----------------------
// DOM Elements
// ----------------------
const saludoDiv = document.getElementById("saludoUsuario");
const carritoContador = document.getElementById("contadorCarrito");
const carritoLista = document.getElementById("listaCarrito");
const inputNombre = document.getElementById("inputNombre");
const btnGuardarNombre = document.getElementById("guardarNombre");

// ----------------------
// Funciones
// ----------------------
function actualizarSaludo() {
  if(nombreUsuario.trim() !== "") {
    saludoDiv.innerText = `Hola ${nombreUsuario}! Bienvenido a ${nombreTienda}`;
  }
}

function guardarNombreUsuario() {
  const nombre = inputNombre.value.trim();
  if(nombre !== "") {
    nombreUsuario = nombre;
    localStorage.setItem("nombreUsuario", nombreUsuario);
    actualizarSaludo();
  }
}

function actualizarContador() {
  carritoContador.innerText = carrito.length;
}

function renderCarrito() {
  carritoLista.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.marca} ${item.modelo} - Talle: ${item.talle} - $${item.precio}
      <button class="eliminarBtn" data-index="${index}">Eliminar</button>
    `;
    carritoLista.appendChild(li);
  });

  document.querySelectorAll(".eliminarBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"));
      carrito.splice(idx,1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
      actualizarContador();
    });
  });
}

function agregarAlCarrito(idProducto, talle) {
  const producto = zapatillas.find(z => z.id === idProducto);
  if(!producto) return;

  carrito.push({...producto, talle});
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
  actualizarContador();
}

// ----------------------
// Inicializar
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Cargar carrito desde localStorage
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  if(carritoStorage) carrito = carritoStorage;

  actualizarSaludo();
  renderCarrito();
  actualizarContador();

  // Guardar nombre
  btnGuardarNombre.addEventListener("click", guardarNombreUsuario);

  // Asignar eventos a botones de productos
  document.querySelectorAll(".producto").forEach(prod => {
    const btn = prod.querySelector("button");
    const selectTalle = prod.querySelector("select");

    btn.addEventListener("click", () => {
      const talle = parseInt(selectTalle.value);
      if(isNaN(talle)) {
        alert("Seleccione un talle válido");
        return;
      }
      const id = parseInt(prod.getAttribute("data-id"));
      agregarAlCarrito(id, talle);
    });
  });
});
