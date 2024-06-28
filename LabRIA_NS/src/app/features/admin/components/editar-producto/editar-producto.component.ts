import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { InsumosService } from '../../services/insumos.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';

interface Ingrediente {
  nombre: string;
  cantidad: number;
}

interface Insumo {
  id: number;
  nombre: string;
  isActive: boolean;
}

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  id: number = 0;
  insumos: Insumo[] = [];
  insumosActivos: Insumo[] = [];
  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private insumosService: InsumosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      ingredientes: this.fb.array([])
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      const id = +params['id'];
      this.id = id;
      await this.cargarInsumos();
      await this.cargarProducto(id);
    });
  }

  get ingredientes(): FormArray {
    return this.productoForm.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(nombre: string = '', cantidad: number = 0): FormGroup {
    return this.fb.group({
      nombre: [nombre, Validators.required],
      cantidad: [cantidad, [Validators.required, Validators.min(0)]],
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

  async cargarInsumos() {
    try {
      this.insumos = await this.insumosService.getInsumos();

      this.insumosActivos = this.insumos.filter(i => i.isActive === true);

      // agregar los isumos del produto a insumos activos
      const producto = await this.productoService.getProductoById(this.id);
      producto.ingredientes.forEach((ingrediente: Ingrediente) => {
        const insumo = this.insumos.find(i => i.nombre === ingrediente.nombre);
        if (insumo) {
          // fijarse que no exista ya
          const existe = this.insumosActivos.find(i => i.id === insumo.id);
          if (!existe) {
            this.insumosActivos.push(insumo);
          }
        }
      });

      console.log('insumos activos: ', this.insumosActivos);

    } catch (error) {
      console.error('Error fetching insumos', error);
      this.toast.showToast('Error cargando los insumos 😩', 'alert alert-error');
    }
  }

  async cargarProducto(id: number) {
    try {
      const producto = await this.productoService.getProductoById(id);
      this.productoForm.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        precio: producto.precio,
      });
      this.ingredientes.clear();
      producto.ingredientes.forEach((ingrediente: Ingrediente) => {
        const insumo = this.insumos.find(i => i.nombre === ingrediente.nombre);
        if (insumo) {
          this.ingredientes.push(this.nuevoIngrediente(insumo.nombre, ingrediente.cantidad));
        }
      });
    } catch (error) {
      console.error('Error fetching producto', error);
      this.toast.showToast('Error cargando el producto 😩', 'alert alert-error');
    }
  }

  async onSubmit() {
    if (this.productoForm.valid) {
      let productoEditado = this.productoForm.value;

      // Convertir nombres de ingredientes a IDs y revisar por inactivos o duplicados
      let ingredientesIds = new Set(); // Almacena IDs para verificar duplicados
      let ingredientesInvalidos = false; // Bandera para detectar ingredientes inactivos o duplicados

      productoEditado.ingredientes = productoEditado.ingredientes
        .map((ingrediente: any) => {
          const insumo = this.insumos.find(i => i.nombre === ingrediente.nombre);
          if (!insumo || !insumo.isActive) {
            ingredientesInvalidos = true; // Marcar como invalido si no está activo
          }
          if (ingredientesIds.has(insumo!.id)) {
            ingredientesInvalidos = true; // Marcar como invalido si es duplicado
          }
          ingredientesIds.add(insumo!.id);
          return insumo ? { id: insumo.id, cantidad: ingrediente.cantidad } : null;
        })
        .filter((ingrediente: any) => ingrediente !== null); // Eliminar ingredientes no encontrados

      if (ingredientesInvalidos) {
        this.toast.showToast('Error: Los ingredientes no pueden estar inactivos o duplicados.', 'alert alert-error');
        return; // Cortar la ejecución si hay ingredientes inválidos
      }

      try {
        await this.productoService.updateProducto(productoEditado, this.id);
        this.toast.showToast('Producto actualizado correctamente 😊', 'alert alert-success');
        this.router.navigate(['/administracion/productos']);
      } catch (error) {
        console.error('Error updating producto', error);
        this.toast.showToast('Error actualizando el producto 😩', 'alert alert-error');
      }
    } else {
      this.toast.showToast('Formulario no válido 😩', 'alert alert-error');
    }
  }

}
