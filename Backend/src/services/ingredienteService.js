const { ingredientes } = require('../data/mockData');
const deepClone = require('../utils/deepClone');

const agregarIngrediente = (ingrediente) => {
    ingredientes.push(ingrediente);
    return deepClone(ingrediente);
};

const obtenerIngredientePorId = (id) => {
    const ingrediente = ingredientes.find(i => i.id == id);
    return ingrediente ? deepClone(ingrediente) : null;
};

const actualizarIngrediente = (id, ingredienteActualizado) => {
    const index = ingredientes.findIndex(i => i.id == id);
    if (index !== -1) {
        ingredientes[index] = { ...ingredientes[index], ...ingredienteActualizado };
        return deepClone(ingredientes[index]);
    }
    return null;
};

const eliminarIngrediente = (id) => {
    const index = ingredientes.findIndex(i => i.id == id);
    if (index !== -1) {
        const ingredienteEliminado = ingredientes.splice(index, 1)[0];
        return deepClone(ingredienteEliminado);
    }
    return null;
};

const obtenerTodosLosIngredientes = () => {
    return ingredientes.map(i => deepClone(i));
};

const obtenerUltimoId = () => {
    if (ingredientes.length === 0) return 0;
    return Math.max(...ingredientes.map(i => i.id));
};

module.exports = {
    agregarIngrediente,
    obtenerIngredientePorId,
    actualizarIngrediente,
    eliminarIngrediente,
    obtenerTodosLosIngredientes,
    obtenerUltimoId,
};