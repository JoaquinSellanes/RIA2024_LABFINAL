import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Producto } from '../../../shared/models/producto';
import { Ingrediente } from '../../../shared/models/ingrediente';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent {
  productoForm: FormGroup;
  productoPreview: Producto;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      id: [0, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      ingredientes: this.fb.array([])
    });

    this.productoPreview = new Producto(0, '', '', '', 0, []);

    this.productoForm.valueChanges.subscribe((val) => {
      this.productoPreview = val;
    });
  }

  get ingredientes(): FormArray {
    return this.productoForm.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      unidad: ['ml', Validators.required]
    });
  }

  agregarIngrediente() {
    this.ingredientes.push(this.nuevoIngrediente());
  }

  removerIngrediente(indice: number) {
    this.ingredientes.removeAt(indice);
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productoForm.patchValue({
          imagen: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const nuevoProducto: Producto = this.productoForm.value;
      console.log("component -> ", nuevoProducto);
      // Lógica para manejar el nuevo producto, por ejemplo, enviarlo a una API
      this.productoService.createProducto(nuevoProducto);
    }
  }
}