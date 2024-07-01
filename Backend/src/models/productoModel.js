class Producto {
    constructor({ id, nombre, descripcion, imagen, precio, ingredientes, isActive = true, isDeleted = false }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.ingredientes = ingredientes;   // Array de objetos {nombre, cantidad, unidad}
        this.isActive = isActive;           // Estado de activación
        this.isDeleted = isDeleted;         // Baja lógica
    }
}

module.exports = Producto;