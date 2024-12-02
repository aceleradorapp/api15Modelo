const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para a página Home
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/home/index.html'));
});

// Exemplo de outra rota de página (por exemplo, para a página "sobre")
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/about/index.html'));
});

// Rota para a página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login/index.html'));
});

// Rota para a página de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/register/index.html'));
});

// Rota para a página de dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/dashboard/index.html'));
});


module.exports = router;