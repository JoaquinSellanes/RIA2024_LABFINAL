const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');
const Pedido = require('../models/pedidoModel');

let usuarios = [
    new Usuario({ id: 1, email: 'admin@panpan.uy', password: 'admin', role: 'ADMIN' }),
    new Usuario({ id: 2, email: 'panadero@panpan.uy', password: 'panadero', role: 'PANADERO' }),
    new Usuario({ id: 3, email: 'cliente@panpan.uy', password: 'cliente', role: 'CLIENTE' }),
];

let productos = [
    new Producto({ id: 1, nombre: 'Pan', descripcion: 'Delicioso pan fresco', imagen: '', precio: 1.00, ingredientes: [] }),
    new Producto({ id: 2, nombre: 'Pan integral', descripcion: 'Delicioso pan integral fresco', imagen: '', precio: 5.00, ingredientes: [], isActive: false}),
];

let pedidos = [
    new Pedido({ id: 1, clienteId: 3, productos: [{ productoId: 1, cantidad: 2 }], estado: 'pendiente', fecha: '2024-06-15' }),
];

module.exports = {
    usuarios,
    productos,
    pedidos,
};
