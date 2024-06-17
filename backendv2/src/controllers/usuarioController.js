exports.register = async (req, res) => {
    const { correo, contraseña, nombre, rol } = req.body;

    // Validaciones
    if (!correo || !contraseña || !nombre || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios: correo, contraseña, nombre, rol' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.find(u => u.correo === correo);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
        id: usuarios.length + 1,
        correo,
        contraseña: hashedPassword,
        nombre,
        rol
    });

    usuarios.push(nuevoUsuario);

    res.status(201).json({ message: 'Usuario registrado correctamente' });
};