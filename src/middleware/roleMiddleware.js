
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para essa ação.' });
        }
        next();
    };
};

module.exports = roleMiddleware;
