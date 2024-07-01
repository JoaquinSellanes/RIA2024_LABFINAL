const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No tienes un token de autorización' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const hasRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

const isAdmin = hasRole(['ADMIN']);
const isPanadero = hasRole(['PANADERO', 'ADMIN']);

module.exports = {
    verifyToken,
    isAdmin,
    isPanadero,
    hasRole
};
