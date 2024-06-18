const { productos } = require('../data/mockData');

const agregarProducto = (producto) => {
    productos.push(producto);
    return producto;
};

const obtenerProductoPorId = (id) => {
    return productos.find(p => p.id == id && !p.isDeleted);
};

const obtenerTodosLosProductos = () => {
    return productos.filter(p => !p.isDeleted);
};

module.exports = {
    agregarProducto,
    obtenerProductoPorId,
    obtenerTodosLosProductos,
};
