import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Usuario {
  id: number;
  email: string;
  role: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosPaginados: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  selectedUserId: number | null = null;
  selectedRole: string = '';
  loaded: boolean = false;
  error: boolean = false;

  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 1;

  filtrosForm: FormGroup;

  constructor(private usuariosService: UsuariosService, private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      role: ['']
    });
  }

  @ViewChild('modalCambiarRol') modalCambiarRol!: ElementRef<HTMLDialogElement>;

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try {
      const response = await this.usuariosService.getUsuarios();
      this.usuarios = response.map(usuario => ({
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        isDeleted: usuario.isDeleted
      }));
      this.usuariosFiltrados = this.usuarios;
      this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.elementosPorPagina);
      this.actualizarPagina();
      this.error = false;
      this.loaded = true;
    } catch (error) {
      console.error('Error fetching usuarios', error);
      this.error = true;
    }
  }

  aplicarFiltros() {
    console.log('Aplicando filtros');
    const filtros = this.filtrosForm.value;
    const role = filtros.role;

    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      return role ? usuario.role === role : true;
    });

    this.totalPaginas = Math.ceil(this.usuariosFiltrados.length / this.elementosPorPagina);
    this.paginaActual = 1;
    this.actualizarPagina();
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarPagina();
    }
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.usuariosPaginados = this.usuariosFiltrados.slice(inicio, fin);
  }

  openModalRol(userId: number) {
    this.selectedUserId = userId;
    this.modalCambiarRol.nativeElement?.showModal();
  }

  closeModal() {
    this.modalCambiarRol.nativeElement?.close();
  }

  async cambiarRol() {
    if (this.selectedUserId !== null) {
      console.log(`Changing role of user ${this.selectedUserId} to ${this.selectedRole}`);
      await this.usuariosService.cambiarRol(this.selectedUserId, this.selectedRole);
      await this.cargarUsuarios();
    }
    this.resetModal();
    this.closeModal();
  }

  async eliminarUsuario(id: number) {
    try {
      await this.usuariosService.eliminarUsuario(id);
      await this.cargarUsuarios();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }

  roleUsuario(id: number) {
    this.openModalRol(id);
  }

  private resetModal() {
    this.selectedRole = '';
  }
}
