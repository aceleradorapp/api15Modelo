const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secretKey: process.env.JWT_SECRET,  // Substitua com uma chave mais segura
    expiresIn: process.env.EXPIRES_TOKEN  // O tempo de expiração do token (1 hora neste caso)
};