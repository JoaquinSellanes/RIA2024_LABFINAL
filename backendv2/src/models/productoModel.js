class Producto {
    constructor({ id, nombre, descripcion, imagen, precio, ingredientes, isDeleted = false, isActive = true }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.ingredientes = ingredientes; // Array de objetos {nombre, cantidad, unidad}
        this.isDeleted = isDeleted; // Baja lógica
        this.isActive = isActive; // Estado de activación
    }
}

module.exports = Producto;
