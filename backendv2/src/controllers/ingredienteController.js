const ingredienteService = require('../services/ingredienteService');

exports.crearIngrediente = (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del ingrediente es obligatorio' });
    }

    try {
        const ultimoId = ingredienteService.obtenerUltimoId();
        const nuevoIngrediente = {
            id: ultimoId + 1,
            nombre,
            isActive: true // Inicializar como activo al crear
        };

        const ingredienteCreado = ingredienteService.agregarIngrediente(nuevoIngrediente);
        res.status(201).json(ingredienteCreado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerIngredientePorId = (req, res) => {
    const { id } = req.params;

    try {
        const ingrediente = ingredienteService.obtenerIngredientePorId(id);
        if (!ingrediente) return res.status(404).json({ error: 'Ingrediente no encontrado' });
        res.status(200).json(ingrediente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarIngrediente = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del ingrediente es obligatorio' });
    }

    try {
        const ingredienteActualizado = ingredienteService.actualizarIngrediente(id, { nombre });
        if (!ingredienteActualizado) return res.status(404).json({ error: 'Ingrediente no encontrado' });
        res.status(200).json(ingredienteActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarIngrediente = (req, res) => {
    const { id } = req.params;

    try {
        const ingredienteEliminado = ingredienteService.eliminarIngrediente(id);
        if (!ingredienteEliminado) return res.status(404).json({ error: 'Ingrediente no encontrado' });
        res.status(200).json(ingredienteEliminado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerTodosLosIngredientes = (req, res) => {
    try {
        const ingredientes = ingredienteService.obtenerTodosLosIngredientes();
        res.status(200).json(ingredientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.activarIngrediente = (req, res) => {
    const { id } = req.params;

    try {
        let ingrediente = ingredienteService.obtenerIngredientePorId(id);
        if (!ingrediente) {
            return res.status(404).json({ error: 'Ingrediente no encontrado' });
        }

        ingrediente.isActive = true;
        ingrediente = ingredienteService.actualizarIngrediente(id, ingrediente); // Actualizar el ingrediente en el servicio

        res.status(200).json(ingrediente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.desactivarIngrediente = (req, res) => {
    const { id } = req.params;

    try {
        let ingrediente = ingredienteService.obtenerIngredientePorId(id);
        if (!ingrediente) {
            return res.status(404).json({ error: 'Ingrediente no encontrado' });
        }

        ingrediente.isActive = false;
        ingrediente = ingredienteService.actualizarIngrediente(id, ingrediente); // Actualizar el ingrediente en el servicio

        res.status(200).json(ingrediente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};