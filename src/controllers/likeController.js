const Like = require('../models/Like');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * Adiciona um like a um post.
 */
const addLike = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id; // Supondo que o middleware de autenticação adiciona `user` ao objeto `req`.

    try {
        // Verifica se o like já existe
        const existingLike = await Like.findOne({ where: { postId, userId } });

        if (existingLike) {
            return res.status(400).json({ message: 'Você já curtiu este post.' });
        }

        // Cria o like
        const like = await Like.create({ postId, userId });

        res.status(201).json({ message: 'Like adicionado com sucesso.', like });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar like.' });
    }
};

/**
 * Remove um like de um post.
 */
const removeLike = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        const like = await Like.findOne({ where: { postId, userId } });

        if (!like) {
            return res.status(404).json({ message: 'Like não encontrado.' });
        }

        await like.destroy();
        res.status(200).json({ message: 'Like removido com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover like.' });
    }
};

/**
 * Obtém todos os likes de um post.
 */
const getLikesByPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const likes = await Like.findAll({
            where: { postId },
            include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
        });

        res.status(200).json(likes);
    } catch (error) {
        console.error('Erro no getLikesByPost:', error); // Detalhe do erro
        res.status(500).json({ message: 'Erro ao buscar likes.' });
    }
};


module.exports = {
    addLike,
    removeLike,
    getLikesByPost,
};
