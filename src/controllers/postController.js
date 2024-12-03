const Post = require('../models/Post');  // Importando o modelo Post
const Like = require('../models/Like');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Criar nova postagem
const createPost = async (req, res) => {
    try {
        const { title, text } = req.body; // Agora o authorId não é enviado diretamente
        const userId = req.user.id; // Pega o ID do usuário autenticado
        const image = req.file; // A imagem será acessada do multer

        if (!image) {
            return res.status(400).json({ message: 'Imagem é obrigatória.' });
        }

        const imagePath = path.join(__dirname, '../../storage/posts', image.filename);

        console.log('Caminho da imagem:', imagePath); // Verificando o caminho da imagem

        // Criação do post
        const newPost = await Post.create({
            title,
            text,
            authorId: userId, // O authorId é derivado do usuário autenticado
            image: imagePath, // Caminho da imagem armazenada
        });

        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Erro ao criar a postagem:', error.message);
        return res.status(500).json({ message: 'Erro ao criar postagem.', error: error.message });
    }
};




// Recuperar todas as postagens
const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao recuperar postagens:', error);
        return res.status(500).json({ message: 'Erro ao recuperar postagens.' });
    }
};

// Recuperar uma postagem por ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: 'Postagem não encontrada.' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error('Erro ao recuperar postagem:', error);
        return res.status(500).json({ message: 'Erro ao recuperar postagem.' });
    }
};

// Método para ativar ou desativar o post
const togglePostActive = async (req, res) => {
    try {
        const { id } = req.params;  // Pegamos o ID do post da URL
        const post = await Post.findByPk(id);  // Busca o post pelo ID

        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }

        // Inverte o valor do campo active (se estiver ativo, desativa; se estiver inativo, ativa)
        post.active = !post.active;

        // Atualiza o post com o novo valor do campo active
        await post.save();

        return res.status(200).json({
            message: `Post ${post.active ? 'ativado' : 'desativado'} com sucesso.`,
            post,
        });
    } catch (error) {
        console.error('Erro ao alterar o status do post:', error.message);
        return res.status(500).json({ message: 'Erro ao alterar o status do post.', error: error.message });
    }
};

const getPaginatedPostsWithLikes = async (req, res) => {
    const { start = 0, end = 10 } = req.query; 

    console.log('********************************************************')

    try {
        // Total de postagens
        const totalPosts = await Post.count();

        // Cálculo de limites
        const limit = end - start;
        const offset = start;

        // Busca postagens ordenadas e inclui os likes
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            where: { active: true }, // Garantir que só busque postagens ativas
            include: [
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'userId'], // Apenas atributos necessários
                    required: false, // Permitir posts sem likes
                },
            ],
        });

        // Verifica se nenhuma postagem foi encontrada
        if (!posts.length) {
            return res.status(404).json({ message: 'Nenhuma postagem encontrada.' });
        }

        // Calcula postagens restantes
        const remainingPosts = totalPosts - end;

        res.status(200).json({
            posts,
            totalPosts,
            remainingPosts: remainingPosts < 0 ? 0 : remainingPosts,
        });
    } catch (error) {
        console.error('Erro ao buscar postagens paginadas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar postagens paginadas.', error: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    togglePostActive,
    getPaginatedPostsWithLikes,
};
