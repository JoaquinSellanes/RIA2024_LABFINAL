class Usuario {
    constructor({ id, email, password, role }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

module.exports = Usuario;
