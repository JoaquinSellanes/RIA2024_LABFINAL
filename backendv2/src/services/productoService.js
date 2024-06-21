const { productos } = require('../data/mockData');
const deepClone = require('../utils/deepClone');

const agregarProducto = (producto) => {
    productos.push(producto);
    return producto;
};

// const obtenerProductoPorId = (id) => {
//     return productos.find(p => p.id == id && !p.isDeleted);
// };

const obtenerProductoPorId = (id) => {
    const producto = productos.find(p => p.id == id && !p.isDeleted);
    return producto ? deepClone(producto) : null;
};

const obtenerTodosLosProductos = () => {
    return productos.filter(p => !p.isDeleted).map(p => deepClone(p)); // Retornar copias de los productos
};

// const obtenerTodosLosProductos = () => {
//     return productos.filter(p => !p.isDeleted);
// };

const actualizarProducto = (id, productoActualizado) => {
    const index = productos.findIndex(p => p.id == id && !p.isDeleted);
    if (index !== -1) {
        productos[index] = { ...productos[index], ...productoActualizado };
        return deepClone(productos[index]);
    }
    return null;
};

const eliminarProducto = (id) => {
    const index = productos.findIndex(p => p.id == id);
    if (index !== -1) {
        productos[index].isDeleted = true;
        return deepClone(productos[index]);
    }
    return null;
};

module.exports = {
    agregarProducto,
    obtenerProductoPorId,
    obtenerTodosLosProductos,
    actualizarProducto,
    eliminarProducto,
};
