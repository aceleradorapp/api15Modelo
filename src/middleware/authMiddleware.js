const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Pegando o token do header "Authorization"

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secretKey);
        req.user = decoded;  // Armazenando os dados do usuário no req para usá-los nas rotas
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido!', error: err.message });
    }
};

module.exports = authMiddleware;
