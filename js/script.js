const productos = [
    { nombre: "Cámara Réflex", precio: 450000, imagen: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300" },
    { nombre: "Smartwatch Sport", precio: 89990, imagen: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300" },
    { nombre: "Auriculares Pro", precio: 120000, imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { nombre: "Laptop Gamer", precio: 850000, imagen: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300" },
    { nombre: "Teclado Mecánico", precio: 55000, imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300" },
    { nombre: "Monitor 4K", precio: 280000, imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300" }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.getElementById('lista-productos');
const contenidoCarrito = document.getElementById('contenido-carrito');
const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

function renderizarCarrito() {
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    const listaHtml = carrito.map((p, i) => `
        <li style="margin: 5px 0;">
            ${p.nombre} - ${formatoCLP.format(p.precio)} 
            <button onclick="eliminarProducto(${i})" style="padding: 2px 8px; background: #ff4444; border:none; cursor:pointer;">X</button>
        </li>
    `).join('');
    
    contenidoCarrito.innerHTML = `
        <ul style="text-align: left; list-style: none;">${listaHtml}</ul>
        <p><strong>Total a pagar: ${formatoCLP.format(total)}</strong></p>
        <button onclick="vaciarCarrito()">VACIAR TODO</button>
    `;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function vaciarCarrito() { 
    carrito = []; 
    localStorage.removeItem('carrito'); 
    renderizarCarrito(); 
}

function agregarAlCarrito(nombre, precio) { 
    carrito.push({ nombre, precio }); 
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    renderizarCarrito(); 
}

function mostrarProductos(lista) {
    contenedor.innerHTML = lista.map(p => `
        <div class="producto">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${formatoCLP.format(p.precio)}</p>
            <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">AGREGAR</button>
        </div>
    `).join('');
}

mostrarProductos(productos);
renderizarCarrito();
