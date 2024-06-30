export class Ingrediente {
  id: number;
  nombre: string;
  isActive: boolean;
  cantidad?: number;

  constructor(id: number, nombre: string, isActive: boolean, cantidad?: number) {
    this.id = id;
    this.nombre = nombre;
    this.isActive = isActive;
    this.cantidad = cantidad;
  }
}
