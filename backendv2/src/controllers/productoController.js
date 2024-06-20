const productoService = require('../services/productoService');
const slugify = require('../utils/slugify');
const filterProductProperties = require('../utils/filterProductProperties');
const sharp = require('sharp');
const { productos } = require('../data/mockData');

const generarIdProducto = (nombre) => {
    const slug = slugify(nombre);
    const numeroUnico = Date.now().toString().slice(-4); // Últimos 4 dígitos del timestamp
    return `${slug}-${numeroUnico}`;
};

exports.crearProducto = async (req, res) => {
    const { nombre, descripcion, imagen, precio, ingredientes } = req.body;

    // Validaciones
    if (!nombre || !descripcion || !precio || !ingredientes) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, descripcion, precio, ingredientes' });
    }

    if (!Array.isArray(ingredientes) || ingredientes.length == 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un ingrediente' });
    }

    // Validar cada ingrediente
    for (const ingrediente of ingredientes) {
        if (!ingrediente.nombre || !ingrediente.cantidad || !ingrediente.unidad) {
            return res.status(400).json({ error: 'Cada ingrediente debe tener nombre, cantidad y unidad' });
        }
    }

    try {
        let processedImageBase64 = null;


        if (imagen != "") {
            // Decodificar la imagen base64
            const imageBuffer = Buffer.from(imagen.split(",")[1], 'base64');
            // Procesar la imagen
            const processedImage = await sharp(imageBuffer)
                .resize(864, 480)
                .toFormat('jpeg')
                .toBuffer();
            
            // Convertir la imagen procesada a base64 y agregar el prefijo adecuado
            processedImageBase64 = `data:image/jpeg;base64,${processedImage.toString('base64')}`;
        } else {
            processedImageBase64 = "";
        }

        // Generar un ID único
        let id;
        let idUnico = false;
        while (!idUnico) {
            id = generarIdProducto(nombre);
            idUnico = !productos.some(p => p.id == id);
        }

        const nuevoProducto = {
            id,
            nombre,
            descripcion,
            imagen: processedImageBase64,  // Guardar la imagen procesada con el prefijo base64
            precio,
            ingredientes,
            isActive: true,
            isDeleted: false
        };
        
        // Agregar el producto
        const productoCreado = productoService.agregarProducto(nuevoProducto);
        res.status(201).json(filterProductProperties(productoCreado));
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
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        const productoActualizado = productoService.actualizarProducto(id, productoData);
        res.status(200).json(filterProductProperties(productoActualizado));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        producto.isDeleted = true;
        res.status(200).json(filterProductProperties(producto));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.activarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        producto.isActive = true;
        res.status(200).json(filterProductProperties(producto));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.desactivarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        producto.isActive = false;
        res.status(200).json(filterProductProperties(producto));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductosDisponibles = (req, res) => {
    try {
        const productos = productoService.obtenerTodosLosProductos();
        const productosDisponibles = productos.filter(p => p.isActive);
        const productosSinPropiedades = productosDisponibles.map(producto => filterProductProperties(producto));
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
