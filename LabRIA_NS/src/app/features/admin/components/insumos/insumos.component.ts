import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent {

  @ViewChild('modalCrearInsumo') modalCrearInsumo!: ElementRef<HTMLDialogElement>;

  insumoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.insumoForm = this.fb.group({
      nombre: ['', Validators.required],
      unidad: ['', Validators.required]
    });
  }

  openModal() {
    this.modalCrearInsumo.nativeElement?.showModal();
  }

  crearInsumo() {
    if (this.insumoForm.valid) {
      console.log(this.insumoForm.value);
      this.insumoForm.reset(); // Limpiar los campos del formulario
      this.modalCrearInsumo.nativeElement?.close(); // Cerrar el modal
    }
  }
}
