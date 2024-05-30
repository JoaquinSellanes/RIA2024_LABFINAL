export class Usuario {
  id: number;
  password: string;
  role: string;
  email: string;
  telefono: string;
  enabled: boolean;
  
  constructor(id: number, password: string, role: string, email: string, telefono: string, enabled: boolean) {
    this.id = id;
    this.password = password;
    this.role = role;
    this.email = email;
    this.telefono = telefono;
    this.enabled = enabled;
  }
}
