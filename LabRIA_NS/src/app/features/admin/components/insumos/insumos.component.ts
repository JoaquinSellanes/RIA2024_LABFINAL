import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsumosService } from '../../services/insumos.service';

interface Insumo {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit {

  @ViewChild('modalCrearInsumo') modalCrearInsumo!: ElementRef<HTMLDialogElement>;

  insumos: Insumo[] = [];
  insumoForm: FormGroup;
  loaded: boolean = false;

  constructor(private fb: FormBuilder, private insumosService: InsumosService) {
    this.insumoForm = this.fb.group({
      nombre: ['', Validators.required],
      unidad: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.insumosService.getInsumos().then((insumos: Insumo[]) => {
      this.insumos = insumos;
    });
    console.log("Insumos: ", this.insumos);

    this.loaded = true;
  }

  openModal() {
    this.modalCrearInsumo.nativeElement?.showModal();
  }

  crearInsumo() {
    if (this.insumoForm.valid) {
      const nsend = this.insumoForm.value.nombre + ' (' + this.insumoForm.value.unidad + ')';
      this.insumosService.createInsumo(nsend).then(() => {
        this.insumosService.getInsumos().then((insumos: Insumo[]) => {
          this.insumos = insumos;
        });
      });
      this.insumoForm.reset();
      this.modalCrearInsumo.nativeElement?.close();
    }
  }

  eliminar(id: number) {
    this.insumosService.deleteInsumo(id).then(() => {
      this.insumosService.getInsumos().then((insumos: Insumo[]) => {
        this.insumos = insumos;
      });
    });
  }

}
