const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { token, role } = await authService.login(username, password);
        res.status(200).json({ token, role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const newUser = await authService.register(username, password, role);
        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
