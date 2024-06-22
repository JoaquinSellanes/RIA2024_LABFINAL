import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

interface Usuario {
  id: number;
  email: string;
  role: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  selectedUserId: number | null = null;
  selectedRole: string = '';
  loaded: boolean = false;

  constructor(private usuariosService: UsuariosService) { }

  @ViewChild('modalCambiarRol') modalCambiarRol!: ElementRef<HTMLDialogElement>;

  async ngOnInit() {
    this.usuarios = await this.usuariosService.getUsuarios();
    this.loaded = true;
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
      this.usuariosService.cambiarRol(this.selectedUserId, this.selectedRole);
      this.usuarios = await this.usuariosService.getUsuarios();
    }
    this.resetModal();
    this.closeModal();
  }

  eliminarUsuario(id: number) {
    throw new Error('Method not implemented.');
  }

  roleUsuario(id: number) {
    this.openModalRol(id);
  }

  private resetModal() {
    this.selectedRole = '';
  }
}
