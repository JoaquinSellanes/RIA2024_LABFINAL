const usuarioService = require('../services/usuarioService');

// Listar todos los usuarios con filtro opcional por rol
exports.listarUsuarios = (req, res) => {
    const { role } = req.query; // Filtro opcional por rol

    try {
        let usuarios = usuarioService.obtenerTodosLosUsuarios();
        if (role) {
            usuarios = usuarios.filter(usuario => usuario.role === role);
        }

        // Eliminar las contraseñas de los usuarios antes de devolverlos
        usuarios = usuarios.map(usuario => {
            const { password, ...usuarioSinPassword } = usuario;
            return usuarioSinPassword;
        });

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar el rol de un usuario
exports.modificarRolUsuario = (req, res) => {
    const { id, role } = req.body;

    if (!id || !role) {
        return res.status(400).json({ error: 'Debe proporcionar el ID del usuario y el nuevo rol' });
    }

    if (!['CLIENTE', 'ADMIN', 'PANADERO'].includes(role)) {
        return res.status(400).json({ error: 'Rol inválido. Debe ser CLIENTE, ADMIN o PANADERO' });
    }

    try {
        const usuario = usuarioService.obtenerUsuarioPorId(id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        usuario.role = role;

        res.status(200).json({ message: 'Rol actualizado exitosamente', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};