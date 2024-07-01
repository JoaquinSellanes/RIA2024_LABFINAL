class Ingrediente {
    constructor({ id, nombre, isActive = true }) {
        this.id = id;
        this.nombre = nombre;
        this.isActive = isActive;
    }
}

module.exports = Ingrediente;