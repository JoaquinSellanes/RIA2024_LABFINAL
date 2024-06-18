const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');
const Pedido = require('../models/pedidoModel');

let usuarios = [
    new Usuario({ id: 1, email: 'admin@panpan.uy', password: 'asdasd123', role: 'ADMIN' }),
    new Usuario({ id: 2, email: 'panadero@panpan.uy', password: 'panadero', role: 'PANADERO' }),
    new Usuario({ id: 3, email: 'cliente@panpan.uy', password: 'cliente', role: 'CLIENTE' }),
    new Usuario({ id: 4, email: 'cliente2@panpan.uy', password: 'cliente2', role: 'CLIENTE' }),
];

let productos = [
    new Producto({
        id: 1,
        nombre: 'Pan',
        descripcion: 'Delicioso pan fresco',
        imagen: '',
        precio: 1.00,
        ingredientes: [
            { nombre: 'Harina', cantidad: 500, unidad: 'gr' },
            { nombre: 'Agua', cantidad: 300, unidad: 'ml' },
            { nombre: 'Sal', cantidad: 10, unidad: 'gr' },
            { nombre: 'Levadura', cantidad: 5, unidad: 'gr' },
        ],
    }),
    new Producto({
        id: 2,
        nombre: 'Pan integral',
        descripcion: 'Delicioso pan integral fresco',
        imagen: '',
        precio: 5.00,
        ingredientes: [
            { nombre: 'Harina integral', cantidad: 500, unidad: 'gr' },
            { nombre: 'Agua', cantidad: 300, unidad: 'ml' },
            { nombre: 'Sal', cantidad: 10, unidad: 'gr' },
            { nombre: 'Levadura', cantidad: 5, unidad: 'gr' },
        ],
        isActive: false,
    }),
    new Producto({
        id: 3,
        nombre: 'Croissant',
        descripcion: 'Croissant de mantequilla',
        imagen: '',
        precio: 2.50,
        ingredientes: [
            { nombre: 'Harina', cantidad: 250, unidad: 'gr' },
            { nombre: 'Mantequilla', cantidad: 150, unidad: 'gr' },
            { nombre: 'Leche', cantidad: 100, unidad: 'ml' },
            { nombre: 'Azúcar', cantidad: 30, unidad: 'gr' },
        ],
    }),
    new Producto({
        id: 4,
        nombre: 'Baguette',
        descripcion: 'Baguette francesa crujiente',
        imagen: '',
        precio: 3.00,
        ingredientes: [
            { nombre: 'Harina', cantidad: 400, unidad: 'gr' },
            { nombre: 'Agua', cantidad: 250, unidad: 'ml' },
            { nombre: 'Sal', cantidad: 8, unidad: 'gr' },
            { nombre: 'Levadura', cantidad: 6, unidad: 'gr' },
        ],
    }),
];

let pedidos = [
    new Pedido({ id: 1, clienteId: 3, productos: [{ productoId: 1, cantidad: 2 }], estado: 'pendiente', fecha: '2024-06-15' }),
    new Pedido({ id: 2, clienteId: 3, productos: [{ productoId: 2, cantidad: 1 }, { productoId: 3, cantidad: 3 }], estado: 'completado', fecha: '2024-06-10' }),
    new Pedido({ id: 3, clienteId: 4, productos: [{ productoId: 1, cantidad: 1 }, { productoId: 4, cantidad: 2 }], estado: 'cancelado', fecha: '2024-06-12' }),
    new Pedido({ id: 4, clienteId: 4, productos: [{ productoId: 3, cantidad: 5 }], estado: 'pendiente', fecha: '2024-06-17' }),
    new Pedido({ id: 5, clienteId: 3, productos: [{ productoId: 4, cantidad: 3 }, { productoId: 2, cantidad: 2 }], estado: 'pendiente', fecha: '2024-06-16' }),
];

module.exports = {
    usuarios,
    productos,
    pedidos,
};
