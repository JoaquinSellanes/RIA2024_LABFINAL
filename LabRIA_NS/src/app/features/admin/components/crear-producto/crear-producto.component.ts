import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Producto } from '../../../shared/models/producto';
import { Ingrediente } from '../../../shared/models/ingrediente';
import { ProductoService } from '../../services/producto.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { InsumosService } from '../../services/insumos.service';
import { Router } from '@angular/router';

interface Insumo {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  productoPreview: Producto;
  ingredientesList: Insumo[] = [];
  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private insumosService: InsumosService,
    private router: Router
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

  ngOnInit(): void {
    this.insumosService.getInsumos().then((insumos: Insumo[]) => {
      this.ingredientesList = insumos;
    });
  }

  get ingredientes(): FormArray {
    return this.productoForm.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0)]],
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
      this.productoService.createProducto(nuevoProducto).then(() => {
        this.toast.showToast('Producto creado correctamente 😊', 'alert alert-success');
        this.router.navigate(['/administracion/productos']);
      });
    } else {
      console.log("Formulario no válido");
      this.toast.showToast('Formulario no válido 😩', 'alert alert-error');
    }
  }
}
