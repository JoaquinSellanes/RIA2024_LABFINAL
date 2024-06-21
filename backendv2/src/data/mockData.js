const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');
const Pedido = require('../models/pedidoModel');
const Ingrediente = require('../models/ingredienteModel');

let usuarios = [
    new Usuario({ id: 1, email: 'admin@panpan.uy', password: 'asdasd123', role: 'ADMIN' }),
    new Usuario({ id: 2, email: 'panadero@panpan.uy', password: 'panadero', role: 'PANADERO' }),
    new Usuario({ id: 3, email: 'cliente@panpan.uy', password: 'cliente', role: 'CLIENTE' }),
    new Usuario({ id: 4, email: 'cliente2@panpan.uy', password: 'cliente2', role: 'CLIENTE' }),
];

let ingredientes = [
    new Ingrediente({ id: 1, nombre: 'Harina (gramos)' }),
    new Ingrediente({ id: 2, nombre: 'Harina (kilogramos)' }),
    new Ingrediente({ id: 3, nombre: 'Sal (gramos)' }),
    new Ingrediente({ id: 4, nombre: 'Cebolla (kilogramos)' }),
    new Ingrediente({ id: 5, nombre: 'Mantequilla (gramos)' }),
    new Ingrediente({ id: 6, nombre: 'Leche (mililitros)' }),
    new Ingrediente({ id: 7, nombre: 'Azúcar (gramos)' }),
    new Ingrediente({ id: 8, nombre: 'Harina integral (gramos)' }),
    new Ingrediente({ id: 9, nombre: 'Agua (mililitros)' }),
    new Ingrediente({ id: 10, nombre: 'Levadura (gramos)' }),
];

let productos = [
    new Producto({
        id: 1,
        nombre: 'Pan',
        descripcion: 'Delicioso pan fresco',
        imagen: '',
        precio: 1.00,
        ingredientes: [
            { id: 1, cantidad: 500 },  // Harina (gramos)
            { id: 9, cantidad: 300 },  // Agua (mililitros)
            { id: 3, cantidad: 10 },   // Sal (gramos)
            { id: 10, cantidad: 5 },   // Levadura (gramos)
        ],
    }),
    new Producto({
        id: 2,
        nombre: 'Pan integral',
        descripcion: 'Delicioso pan integral fresco',
        imagen: '',
        precio: 5.00,
        ingredientes: [
            { id: 8, cantidad: 500 },  // Harina integral (gramos)
            { id: 9, cantidad: 300 },  // Agua (mililitros)
            { id: 3, cantidad: 10 },   // Sal (gramos)
            { id: 10, cantidad: 5 },   // Levadura (gramos)
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
            { id: 1, cantidad: 250 },  // Harina (gramos)
            { id: 5, cantidad: 150 },  // Mantequilla (gramos)
            { id: 6, cantidad: 100 },  // Leche (mililitros)
            { id: 7, cantidad: 30 },   // Azúcar (gramos)
        ],
    }),
    new Producto({
        id: 4,
        nombre: 'Baguette',
        descripcion: 'Baguette francesa crujiente',
        imagen: '', 
        precio: 3.00,
        ingredientes: [
            { id: 1, cantidad: 400 },  // Harina (gramos)
            { id: 9, cantidad: 250 },  // Agua (mililitros)
            { id: 3, cantidad: 8 },    // Sal (gramos)
            { id: 10, cantidad: 6 },   // Levadura (gramos)
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
    ingredientes,
};
