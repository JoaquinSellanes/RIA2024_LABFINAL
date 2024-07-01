const productoService = require('../services/productoService');
const pedidoService = require('../services/pedidoService');
const ingredienteService = require('../services/ingredienteService');
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

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un ingrediente' });
    }

    // Validar cada ingrediente
    for (const ingrediente of ingredientes) {
        if (!ingrediente.id || !ingrediente.cantidad) {
            return res.status(400).json({ error: 'Cada ingrediente debe tener un ID y una cantidad' });
        }
        const ingredienteValido = ingredienteService.obtenerIngredientePorId(ingrediente.id);
        if (!ingredienteValido) {
            return res.status(400).json({ error: `El ingrediente '${ingredienteValido.nombre}' no existe` });
        }
        if (!ingredienteValido.isActive) {
            return res.status(400).json({ error: `El ingrediente '${ingredienteValido.nombre}' no está activo` });
        }
    }

    try {
        let processedImageBase64 = null;

        if (imagen !== "") {
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
            idUnico = !productos.some(p => p.id === id);
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

        // Mapear IDs de ingredientes a sus nombres
        const ingredientesConNombres = productoCreado.ingredientes.map(ingrediente => {
            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
            return {
                nombre: ingredienteInfo.nombre,
                cantidad: ingrediente.cantidad
            };
        });

        const productoConNombresDeIngredientes = {
            ...productoCreado,
            ingredientes: ingredientesConNombres
        };

        res.status(201).json(filterProductProperties(productoConNombresDeIngredientes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductoPorId = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        // Mapear IDs de ingredientes a sus nombres
        const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
            return {
                nombre: ingredienteInfo.nombre,
                cantidad: ingrediente.cantidad
            };
        });

        const productoConNombresDeIngredientes = {
            ...producto,
            ingredientes: ingredientesConNombres
        };

        res.status(200).json(filterProductProperties(productoConNombresDeIngredientes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, precio, ingredientes } = req.body;

    // Validaciones
    if (!nombre || !descripcion || !precio || !ingredientes) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, descripcion, precio, ingredientes' });
    }

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un ingrediente' });
    }

    // Validar cada ingrediente
    for (const ingrediente of ingredientes) {
        if (!ingrediente.id || !ingrediente.cantidad) {
            return res.status(400).json({ error: 'Cada ingrediente debe tener un ID y una cantidad' });
        }
        const ingredienteValido = ingredienteService.obtenerIngredientePorId(ingrediente.id);
        if (!ingredienteValido) {
            return res.status(400).json({ error: `El ingrediente con ID ${ingrediente.id} no existe` });
        }
        if (!ingredienteValido.isActive) {
            return res.status(400).json({ error: `El ingrediente con ID ${ingrediente.id} no está activo` });
        }
    }

    try {
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        const productoActualizado = productoService.actualizarProducto(id, {
            nombre,
            descripcion,
            imagen,
            precio,
            ingredientes,
        });

        // Mapear IDs de ingredientes a sus nombres
        const ingredientesConNombres = productoActualizado.ingredientes.map(ingrediente => {
            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
            return {
                nombre: ingredienteInfo.nombre,
                cantidad: ingrediente.cantidad
            };
        });

        const productoConNombresDeIngredientes = {
            ...productoActualizado,
            ingredientes: ingredientesConNombres
        };

        res.status(200).json(filterProductProperties(productoConNombresDeIngredientes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    try {
        const producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        // Verificar si el producto está en un pedido pendiente
        if (pedidoService.productoEnPedidoPendiente(id)) {
            return res.status(400).json({ error: 'No se puede eliminar el producto porque está en un pedido pendiente' });
        }

        const productoEliminado = productoService.eliminarProducto(id);

        // Mapear IDs de ingredientes a sus nombres
        const ingredientesConNombres = productoEliminado.ingredientes.map(ingrediente => {
            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
            return {
                nombre: ingredienteInfo.nombre,
                cantidad: ingrediente.cantidad
            };
        });

        const productoConNombresDeIngredientes = {
            ...productoEliminado,
            ingredientes: ingredientesConNombres
        };

        res.status(200).json(filterProductProperties(productoConNombresDeIngredientes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.activarProducto = (req, res) => {
    const { id } = req.params;

    try {
        let producto = productoService.obtenerProductoPorId(id);
        if (!producto) { return res.status(404).json({ error: 'Producto no encontrado' }); }

        producto.isActive = true;
        // console.log(`Producto encontrado y activado: ${JSON.stringify(producto, null, 2)}`);

        producto = productoService.actualizarProducto(id, producto); // Actualizar el producto en el servicio

        // Mapear IDs de ingredientes a sus nombres
        const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
            return {
                nombre: ingredienteInfo.nombre,
                cantidad: ingrediente.cantidad
            };
        });

        const productoConNombresDeIngredientes = {
            ...producto,
            ingredientes: ingredientesConNombres
        };

        res.status(200).json(filterProductProperties(productoConNombresDeIngredientes));
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.desactivarProducto = (req, res) => {
    const { id } = req.params;

    try {
        let producto = productoService.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        producto.isActive = false;
        producto = productoService.actualizarProducto(id, producto); // Actualizar el producto en el servicio

        // Mapear IDs de ingredientes a sus nombres
        const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
            const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
            return {
                nombre: ingredienteInfo.nombre,
                cantidad: ingrediente.cantidad
            };
        });

        const productoConNombresDeIngredientes = {
            ...producto,
            ingredientes: ingredientesConNombres
        };

        res.status(200).json(filterProductProperties(productoConNombresDeIngredientes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductosDisponibles = (req, res) => {
    try {
        const productos = productoService.obtenerTodosLosProductos();
        const productosDisponibles = productos.filter(p => p.isActive);

        // Mapear IDs de ingredientes a sus nombres
        const productosConNombresDeIngredientes = productosDisponibles.map(producto => {
            const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
                const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                return {
                    nombre: ingredienteInfo.nombre,
                    cantidad: ingrediente.cantidad
                };
            });
            return {
                ...producto,
                ingredientes: ingredientesConNombres
            };
        });

        res.status(200).json(productosConNombresDeIngredientes.map(producto => filterProductProperties(producto)));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerTodosLosProductos = (req, res) => {
    try {
        const productos = productoService.obtenerTodosLosProductos();

        // Mapear IDs de ingredientes a sus nombres
        const productosConNombresDeIngredientes = productos.map(producto => {
            const ingredientesConNombres = producto.ingredientes.map(ingrediente => {
                const ingredienteInfo = ingredienteService.obtenerIngredientePorId(ingrediente.id);
                return {
                    nombre: ingredienteInfo.nombre,
                    cantidad: ingrediente.cantidad
                };
            });
            return {
                ...producto,
                ingredientes: ingredientesConNombres
            };
        });

        res.status(200).json(productosConNombresDeIngredientes.map(producto => {
            const { isDeleted, ...rest } = producto;
            return rest;
        }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};