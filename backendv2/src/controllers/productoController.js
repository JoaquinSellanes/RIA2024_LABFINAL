const productoService = require('../services/productoService');
const filterProductProperties = require('../utils/filterProductProperties');

exports.crearProducto = (req, res) => {
    const { nombre, descripcion, imagen, precio, ingredientes } = req.body;

    // Validaciones
    if (!nombre || !descripcion || !imagen || !precio || !ingredientes) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, descripcion, imagen, precio, ingredientes' });
    }

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un ingrediente' });
    }

    // Validar cada ingrediente
    for (const ingrediente of ingredientes) {
        if (!ingrediente.nombre || !ingrediente.cantidad || !ingrediente.unidad) {
            return res.status(400).json({ error: 'Cada ingrediente debe tener nombre, cantidad y unidad' });
        }
    }

    try {
        const nuevoProducto = productoService.crearProducto(req.body);
        res.status(201).json(filterProductProperties(nuevoProducto));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductoPorId = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(parseInt(id));
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.status(200).json(filterProductProperties(producto));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarProducto = (req, res) => {
    const { id } = req.params;
    const productoData = req.body;

    try {
        const productoActualizado = productoService.actualizarProducto(parseInt(id), productoData);
        res.status(200).json(filterProductProperties(productoActualizado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const productoEliminado = productoService.eliminarProducto(parseInt(id));
        res.status(200).json(filterProductProperties(productoEliminado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.activarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const productoActivado = productoService.activarProducto(parseInt(id));
        res.status(200).json(filterProductProperties(productoActivado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.desactivarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const productoDesactivado = productoService.desactivarProducto(parseInt(id));
        res.status(200).json(filterProductProperties(productoDesactivado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductosDisponibles = (req, res) => {
    try {
        const productos = productoService.obtenerProductosDisponibles();
        const productosSinPropiedades = productos.map(producto => filterProductProperties(producto));
        res.status(200).json(productosSinPropiedades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerTodosLosProductos = (req, res) => {
    try {
        const productos = productoService.obtenerTodosLosProductos();
        const productosSinIsDeleted = productos.map(producto => {
            const { isDeleted, ...rest } = producto;
            return rest;
        });
        res.status(200).json(productosSinIsDeleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

