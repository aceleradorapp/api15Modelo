const adminMiddleware = (req, res, next) => {
    // Verificando se o usuário foi autenticado
    if (!req.user) {
        return res.status(401).json({ message: 'Usuário não autenticado!' });
    }
    console.log(req.user.roles)
    // Verificando se o usuário tem o papel de 'admin'
    if (req.user.roles !== 'admin' && req.user.roles !== 'owner') {
        return res.status(403).json({ message: 'Acesso negado. Você não tem permissão!' });
    }

    // Se for admin, continue para a próxima função (rota)
    next();
};

module.exports = adminMiddleware;
