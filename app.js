// ----------------------
// Datos y variables
// ----------------------
const nombreTienda = "Trendy Sneakers";
let carrito = [];
let nombreUsuario = "";

const zapatillas = [
  { id: 1, marca: "Nike", modelo: "Nike V2K", precio: 145000, talles: [38, 39, 40, 41, 42] },
  { id: 2, marca: "Nike", modelo: "Nike Jordan", precio: 140000, talles: [38, 39, 40, 41, 42] },
  { id: 3, marca: "Nike", modelo: "Nike LD-1000", precio: 150000, talles: [38, 39, 40, 41, 42] },
  { id: 4, marca: "Nike", modelo: "Nike P-6000", precio: 200000, talles: [37, 38, 39, 40] },
  { id: 5, marca: "Puma", modelo: "RS-X", precio: 160000, talles: [37, 38, 39, 40] },
  { id: 6, marca: "Puma", modelo: "Puma Speedcat", precio: 170000, talles: [37, 38, 39, 40] },
  { id: 7, marca: "Puma", modelo: "Puma ROCKY", precio: 180000, talles: [39, 40, 41, 42, 43] },
  { id: 8, marca: "Puma", modelo: "Puma Indoor", precio: 190000, talles: [37, 38, 39, 40] },
  { id: 9, marca: "Puma", modelo: "Puma Speedcat", precio: 170000, talles: [37, 38, 39, 40] },
  { id: 10, marca: "Adidas", modelo: "Adidas Court Lo", precio: 170000, talles: [37, 38, 39, 40] },
  { id: 11, marca: "Adidas", modelo: "Adidas Gazelle Lo", precio: 180000, talles: [37, 38, 39, 40] },
  { id: 12, marca: "Adidas", modelo: "Adidas SL72", precio: 190000, talles: [37, 38, 39, 40] },
  { id: 13, marca: "Adidas", modelo: "Adidas Taekwondo", precio: 160000, talles: [37, 38, 39, 40] },
  { id: 14, marca: "New Balance", modelo: "New Balance 1906R", precio: 180000, talles: [37, 38, 39, 40] },
  { id: 15, marca: "New Balance", modelo: "New Balance 2002R", precio: 189000, talles: [37, 38, 39, 40] },
  { id: 16, marca: "New Balance", modelo: "New Balance 550", precio: 180000, talles: [37, 38, 39, 40] },
  { id: 17, marca: "New Balance", modelo: "New Balance 650", precio: 190000, talles: [37, 38, 39, 40] }
];

// ----------------------
// Función de bienvenida
// ----------------------
function inicio() {
  nombreUsuario = prompt("¡Bienvenido a " + nombreTienda + "! Ingresa tu nombre:");
  if (!nombreUsuario || nombreUsuario.trim() === "") {
    nombreUsuario = "invitado";
  }
  alert("Hola " + nombreUsuario + "! Esperamos que encuentres tus zapatillas favoritas 😎");
}

// ----------------------
// Función agregar al carrito 
// ----------------------
function agregarAlCarrito(nombreProducto) {
  const zap = zapatillas.find(z => z.modelo.toLowerCase() === nombreProducto.toLowerCase());
  if (!zap) {
    alert("Error: no se encontró el producto.");
    return;
  }

  let talleElegido = parseInt(prompt(`Elige un talle para ${zap.marca} ${zap.modelo}.\nDisponibles: ${zap.talles.join(", ")}`));

  if (zap.talles.includes(talleElegido)) {
    carrito.push({ ...zap, talle: talleElegido });
    alert(`Perfecto! Agregaste ${zap.marca} ${zap.modelo} talle ${talleElegido} al carrito.`);
  } else {
    alert(`Lo sentimos, talle ${talleElegido} no disponible. Elige otro.`);
  }
}


document.addEventListener("DOMContentLoaded", function() {
  // Ejecutar bienvenida automáticamente
  inicio();

  // Asignar evento a todos los botones de agregar al carrito
  const botones = document.querySelectorAll(".producto button");
  botones.forEach(btn => {
    btn.addEventListener("click", function() {
      
      const productoDiv = btn.closest(".producto");
      const nombreProducto = productoDiv.querySelector("h3").innerText.trim();
      agregarAlCarrito(nombreProducto);
    });
  });
});
