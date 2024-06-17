const { productos } = require('../data/mockData');
const Producto = require('../models/productoModel');
const slugify = require('../utils/slugify');

const generarIdProducto = (nombre) => {
    const slug = slugify(nombre);
    const numeroUnico = Date.now().toString().slice(-4); // Últimos 4 dígitos del timestamp
    return `${slug}-${numeroUnico}`;
};

const crearProducto = (productoData) => {
    let id;
    let idUnico = false;

    // Generar un ID único
    while (!idUnico) {
        id = generarIdProducto(productoData.nombre);
        idUnico = !productos.some(p => p.id === id);
    }

    const nuevoProducto = new Producto({ id, ...productoData });
    productos.push(nuevoProducto);
    return nuevoProducto;
};

const obtenerProductoPorId = (id) => {
    return productos.find(p => p.id === id && !p.isDeleted);
};

const actualizarProducto = (id, productoData) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) throw new Error('Producto no encontrado');

    Object.assign(producto, productoData);
    return producto;
};

const eliminarProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) throw new Error('Producto no encontrado');

    producto.isDeleted = true;
    return producto;
};

const activarProducto = (id) => {
    const producto = productos.find(p => p.id == id);
    if (!producto) throw new Error('Producto no encontrado');

    producto.isActive = true;
    return producto;
};

const desactivarProducto = (id) => {
    const producto = productos.find(p => p.id == id);
    if (!producto) throw new Error('Producto no encontrado');

    producto.isActive = false;
    return producto;
};

const obtenerProductosDisponibles = () => {
    return productos.filter(p => !p.isDeleted && p.isActive);
};

const obtenerTodosLosProductos = () => {
    return productos.filter(p => !p.isDeleted);
};

module.exports = {
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    activarProducto,
    desactivarProducto,
    obtenerProductosDisponibles,
    obtenerTodosLosProductos,
};
