export class Usuario {
  id: number;
  email: string;
  telefono: string;
  role: string;
  password: string;
  enabled: boolean = true;

  constructor({ id, email, telefono, role, password }: { id: number, email: string, telefono: string, role: string, password: string }) {
    this.id = id;
    this.email = email;
    this.telefono = telefono;
    this.role = role;
    this.password = password;
  }
}