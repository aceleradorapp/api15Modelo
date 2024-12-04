const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User  = require('../models/User'); 
const Profile = require('../models/Profile');
const jwtConfig = require('../config/jwtConfig');

// Função para gerar o token JWT
const generateToken = (user) => {
    const payload = {
        id: user.id,
        nome: user.name, 
        email: user.email,
        roles: user.roles
    };

    const token = jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
    return token;
};

const login = async (req, res) => {
    const { email, password } = req.body;    

    try {
        //const user = await User.findOne({ where: { email } });
        const user = await User.findOne({
            where: { email },
            include: { model: Profile, as: 'profile', attributes: ['photo'] }, // Inclui o perfil e a foto
        });
        
        
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado!' });
        }        

        // Verificar se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);        

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta!' });
        }
        
        // Gerar token
        const token = generateToken(user);           

        return res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            name: user.name,
            type: user.roles,
            photo: user.profile?.photo || null,
        });

    } catch (err) {
        return res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }
};

// Função para verificar se o token é válido
const verifyToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secretKey);

        // Calcular o tempo restante
        const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
        const expiresIn = decoded.exp - currentTime;

        if (expiresIn <= 0) {
            return res.status(401).json({ message: 'Token expirado!' });
        }

        return res.status(200).json({
            message: 'Token válido!',
            remainingTime: expiresIn // Tempo restante em segundos
        });
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido!', error: err.message });
    }
};

module.exports = { login, verifyToken };
