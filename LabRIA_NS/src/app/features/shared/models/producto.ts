import { Ingrediente } from './ingrediente';

export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  ingredientes: Ingrediente[];
  isActive: boolean;
  isDeleted: boolean;

  constructor({ id, nombre, descripcion, imagen, precio, ingredientes, isActive = true, isDeleted = false }: { id: number, nombre: string, descripcion: string, imagen: string, precio: number, ingredientes: Ingrediente[], isActive?: boolean, isDeleted?: boolean }) {
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