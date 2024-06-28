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
  insumosPaginados: Insumo[] = [];
  insumoForm: FormGroup;
  loaded: boolean = false;
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 1;

  constructor(private fb: FormBuilder, private insumosService: InsumosService) {
    this.insumoForm = this.fb.group({
      nombre: ['', Validators.required],
      unidad: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.cargarInsumos();
    this.loaded = true;
  }

  async cargarInsumos() {
    const insumos = await this.insumosService.getInsumos();
    this.insumos = insumos;
    this.totalPaginas = Math.ceil(this.insumos.length / this.elementosPorPagina);
    this.actualizarPagina();
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.insumosPaginados = this.insumos.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarPagina();
    }
  }

  openModal() {
    this.modalCrearInsumo.nativeElement?.showModal();
  }

  async crearInsumo() {
    if (this.insumoForm.valid) {
      const nsend = this.insumoForm.value.nombre + ' (' + this.insumoForm.value.unidad + ')';
      await this.insumosService.createInsumo(nsend);
      await this.cargarInsumos();
      this.insumoForm.reset();
      this.modalCrearInsumo.nativeElement?.close();
    }
  }

  async eliminar(id: number) {
    await this.insumosService.deleteInsumo(id);
    await this.cargarInsumos();
  }
}
