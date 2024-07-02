const usuarioService = require('../services/usuarioService');
const pedidoService = require('../services/pedidoService');

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

// Obtener datos de la cuenta del usuario logueado
exports.obtenerMiCuenta = (req, res) => {
    const usuarioId = req.userId; // Obtener el ID del usuario desde el token

    try {
        const usuario = usuarioService.obtenerUsuarioPorId(usuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Eliminar la contraseña antes de devolver el usuario
        const { password, ...usuarioSinPassword } = usuario;

        // Obtener la cantidad de pedidos del usuario
        const pedidos = pedidoService.obtenerPedidosPorClienteId(usuarioId);
        const totalPedidos = pedidos.length;
        const pedidosPendientes = pedidos.filter(pedido => pedido.estado === 'pendiente').length;
        const pedidosEnPreparacion = pedidos.filter(pedido => pedido.estado === 'en preparación').length;
        const pedidosListosParaRecoger = pedidos.filter(pedido => pedido.estado === 'listo para recoger').length;

        res.status(200).json({
            ...usuarioSinPassword,
            pedidos: {
                total: totalPedidos,
                pendientes: pedidosPendientes,
                enPreparacion: pedidosEnPreparacion,
                listosParaRecoger: pedidosListosParaRecoger
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dar de baja a un usuario
exports.darDeBajaUsuario = (req, res) => {
    const { id } = req.params;

    try {
        const usuario = usuarioService.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (usuario.isDeleted) {
            return res.status(400).json({ error: 'El usuario ya se encuentra dado de baja' });
        }

        // Obtener los pedidos del usuario
        const pedidos = pedidoService.obtenerPedidosPorClienteId(id);
        const pedidosEnPreparacion = pedidos.filter(pedido => pedido.estado === 'en preparación');

        // Verificar si hay pedidos en preparación
        if (pedidosEnPreparacion.length > 0) {
            return res.status(400).json({ error: 'El usuario tiene pedidos en preparación y no puede ser dado de baja' });
        }

        // Eliminar todos los pedidos pendientes
        const pedidosPendientes = pedidos.filter(pedido => pedido.estado === 'pendiente');
        pedidosPendientes.forEach(pedido => {
            pedidoService.eliminarPedido(pedido.id);
        });

        usuario.isDeleted = true;
        const usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);

        const { isDeleted, password, ...usuarioSinPasswd } = usuarioActualizado;

        res.status(200).json({ message: 'Usuario dado de baja exitosamente y pedidos pendientes eliminados', usuario: usuarioSinPasswd });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

