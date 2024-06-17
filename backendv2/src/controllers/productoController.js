const productoService = require('../services/productoService');
const filterProductProperties = require('../utils/filterProductProperties');
const sharp = require('sharp');

exports.crearProducto = async (req, res) => {
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
        // Decodificar la imagen base64
        const imageBuffer = Buffer.from(imagen.split(",")[1], 'base64');
        // Procesar la imagen
        const processedImage = await sharp(imageBuffer)
            .resize(864, 480)
            .toFormat('jpeg')
            .toBuffer();
        
        // Convertir la imagen procesada a base64 y agregar el prefijo adecuado
        const processedImageBase64 = `data:image/jpeg;base64,${processedImage.toString('base64')}`;
        
        // Crear el producto en el servicio de productos (mock)
        const nuevoProducto = productoService.crearProducto({
            nombre,
            descripcion,
            imagen: processedImageBase64,  // Guardar la imagen procesada con el prefijo base64
            precio,
            ingredientes
        });

        res.status(201).json(filterProductProperties(nuevoProducto));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductoPorId = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(id);
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
        const productoActualizado = productoService.actualizarProducto(id, productoData);
        res.status(200).json(filterProductProperties(productoActualizado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const productoEliminado = productoService.eliminarProducto(id);
        res.status(200).json(filterProductProperties(productoEliminado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.activarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const productoActivado = productoService.activarProducto(id);
        res.status(200).json(filterProductProperties(productoActivado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.desactivarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const productoDesactivado = productoService.desactivarProducto(id);
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
