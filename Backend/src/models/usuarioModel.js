const bcrypt = require('bcryptjs');

class Usuario {
    constructor({ id, email, password, telefono, role }) {
        this.id = id;
        this.email = email;
        this.telefono = telefono;
        this.role = role;
        this.password = this.hashPassword(password);
        this.isDeleted = false;
    }

    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}

module.exports = Usuario;