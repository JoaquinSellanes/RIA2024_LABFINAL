const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');
const Pedido = require('../models/pedidoModel');

async function createMockData () {
    let usuarios = [
        new Usuario({ id: 1, correo: 'admin@example.com', password: 'static', nombre: 'Admin', rol: 'ADMIN' }),
        new Usuario({ id: 2, correo: 'panadero@example.com', password: 'static', nombre: 'Panadero', rol: 'PANADERO' }),
        new Usuario({ id: 3, correo: 'cliente@example.com', password: 'static', nombre: 'Cliente', rol: 'CLIENTE' })
    ];

    // Esperar a que todas las contraseñas se hasheen
    await Promise.all(usuarios.map(usuario => usuario.setPassword(usuario.password)));

    let productos = [
        new Producto({ id: 1, nombre: 'Pan', descripcion: 'Delicioso pan fresco', imagen: '', precio: 1.00, ingredientes: [] }),
        new Producto({ id: 2, nombre: 'Pan integral', descripcion: 'Delicioso pan integral fresco', imagen: '', precio: 5.00, ingredientes: [], isActive: false }),
    ];

    let pedidos = [
        new Pedido({ id: 1, clienteId: 3, productos: [{ productoId: 1, cantidad: 2 }], estado: 'pendiente', fecha: '2024-06-15' }),
    ];

    return {
        usuarios,
        productos,
        pedidos,
    };
}

module.exports = createMockData;
