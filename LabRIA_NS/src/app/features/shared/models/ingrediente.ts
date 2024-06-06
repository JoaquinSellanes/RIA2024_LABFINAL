type Unidad = "ml" | "gr" | "c/u";

export class Ingrediente {
  nombre: string;
  cantidad: number;
  unidad: Unidad;

  constructor(nombre: string, cantidad: number, unidad: Unidad) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.unidad = unidad;
  }
}
