import { Ingrediente } from "./ingrediente";

export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  ingredientes: Ingrediente[];

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    precio: number,
    ingredientes: Ingrediente[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.precio = precio;
    this.ingredientes = ingredientes;
  }
}
