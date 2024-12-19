const { Op, Sequelize  } = require('sequelize');
const Post = require('../models/Post');  // Importando o modelo Post
const Like = require('../models/Like');
const Profile = require('../models/Profile');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Criar nova postagem
const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const userId = req.user.id;
        const roles = req.user.roles;
        const image = req.file; 

        if (!image) {
            return res.status(400).json({ message: 'Imagem é obrigatória.' });
        }
        
        let active = (roles === 'admin' || roles === 'owner') ? true : false;
        let approved = (roles === 'admin' || roles === 'owner') ? true : false;

        const imagePath = path.join('storage/posts', image.filename);        

        // Criação do post
        const newPost = await Post.create({
            title,
            text,
            authorId: userId, 
            image: imagePath, 
            active: active,
            approved:approved
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
        const userId = req.user.id;  // O ID do usuário logado

        // Buscar a postagem com os relacionamentos necessários
        const post = await Post.findByPk(id, {
            include: [
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'userId'], // Apenas atributos necessários
                    required: false, // Permitir postagens sem likes
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name'], // Apenas o nome do usuário
                            include: [
                                {
                                    model: Profile,
                                    as: 'profile',
                                    attributes: ['photo'], // Foto do perfil
                                }
                            ]
                        }
                    ]
                },
                {
                    model: User, // Inclui o modelo User para o autor da postagem
                    as: 'author',  // Alias que você configurou no relacionamento de Post com User
                    attributes: ['name'], // Nome do autor
                    include: [
                        {
                            model: Profile,
                            as: 'profile',  // Alias para o relacionamento de Profile
                            attributes: ['photo'],  // Foto do perfil do autor
                        }
                    ]
                },
            ],
        });

        // Verifica se a postagem foi encontrada
        if (!post) {
            return res.status(404).json({ message: 'Postagem não encontrada.' });
        }

        // Verifica se o usuário logado (userId) está na lista de likes da postagem
        const liked = post.likes.some(like => like.user.id === userId); // Acessando o userId de like.user.id

        // Retorna a postagem com as informações de curtidas
        return res.status(200).json({
            ...post.toJSON(),
            liked: liked, // Adiciona o campo 'liked' correto
        });
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
        //post.approved = !post.approved;
        //post.createdAt = new Date();

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

// Método para ativar ou desativar o post
const togglePostApprove = async (req, res) => {
    try {
        const { id } = req.params;  // Pegamos o ID do post da URL
        const post = await Post.findByPk(id);  // Busca o post pelo ID

        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }

        // Inverte o valor do campo active (se estiver ativo, desativa; se estiver inativo, ativa)
        post.active = true;//!post.active;
        post.approved = !post.approved;
        post.createdAt = new Date();

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

    // Garantir que start e end sejam numéricos
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);
    const userId = req.user.id;


    try {
        // Total de postagens
        const totalPosts = await Post.count();

        // Cálculo de limites
        const limit = endInt - startInt;
        const offset = startInt;

        // Busca postagens ordenadas e inclui os likes, os nomes dos usuários que deram os likes, foto do perfil, e as informações do autor da postagem
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: limit,  // Limite para a consulta
            offset: offset,  // Offset para a consulta
            where: { active:true, approved: true }, // Garantir que só busque postagens ativas
            include: [
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'userId'], // Apenas atributos necessários
                    required: false, // Permitir posts sem likes
                    include: [
                        {
                            model: User,
                            as: 'user',  // Nome do alias que você configurou para o relacionamento no Like
                            attributes: ['id','name'], // Apenas o nome do usuário
                            include: [
                                {
                                    model: Profile,
                                    as: 'profile',  // Nome do alias que você configurou para o relacionamento com Profile
                                    attributes: ['photo'],  // Inclui a foto do perfil
                                }
                            ]
                        }
                    ]
                },
                {
                    model: User, // Inclui o modelo User para o autor da postagem
                    as: 'author',  // Alias que você deve ter configurado no relacionamento de Post com User
                    attributes: ['name'], // Nome do autor
                    include: [
                        {
                            model: Profile,
                            as: 'profile',  // Alias para o relacionamento de Profile
                            attributes: ['photo'],  // Foto do perfil do autor
                        }
                    ]
                },
            ],
        });

        // Verifica se nenhuma postagem foi encontrada
        if (!posts.length) {
            return res.status(404).json({ message: 'Nenhuma postagem encontrada.' });
        }

        const postsWithLiked = posts.map(post => {
            // Verifica se o usuário logado (userId) está na lista de likes da postagem
            const liked = post.likes.some(like => like.user.id === userId); // Acessando o userId de like.user.id
            const isAuthorPost = parseInt(post.authorId) === parseInt(userId);

            return {
                ...post.toJSON(),
                liked: liked, // Adiciona o campo 'liked' correto
                authorPost:isAuthorPost
            };
        });

        // Calcula postagens restantes
        const remainingPosts = totalPosts - endInt;

        res.status(200).json({
            posts: postsWithLiked,
            totalPosts,
            remainingPosts: remainingPosts < 0 ? 0 : remainingPosts,
        });
    } catch (error) {
        console.error('Erro ao buscar postagens paginadas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar postagens paginadas.', error: error.message });
    }
};

// Pega todas as postagem do usuário logado
const getPaginatedUserPostsWithLikes = async (req, res) => {
    const { start = 0, end = 10 } = req.query;

    // Garantir que start e end sejam numéricos
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);
    const userId = req.user.id;

    try {
        // Total de postagens do usuário
        const totalPosts = await Post.count({
            where: {
                authorId: userId, // Filtrar pelo autor
                active: true,    // Apenas postagens ativas
            },
        });

        // Cálculo de limites
        const limit = endInt - startInt;
        const offset = startInt;

        // Busca postagens do usuário
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: limit, // Limite para a consulta
            offset: offset, // Offset para a consulta
            where: {
                authorId: userId, // Filtrar pelo autor
                active: true,    // Apenas postagens ativas
            },
            include: [
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'userId'], // Apenas atributos necessários
                    required: false, // Permitir posts sem likes
                    include: [
                        {
                            model: User,
                            as: 'user', // Nome do alias que você configurou para o relacionamento no Like
                            attributes: ['id', 'name'], // Apenas o nome do usuário
                            include: [
                                {
                                    model: Profile,
                                    as: 'profile', // Nome do alias que você configurou para o relacionamento com Profile
                                    attributes: ['photo'], // Inclui a foto do perfil
                                },
                            ],
                        },
                    ],
                },
                {
                    model: User, // Inclui o modelo User para o autor da postagem
                    as: 'author', // Alias que você deve ter configurado no relacionamento de Post com User
                    attributes: ['name'], // Nome do autor
                    include: [
                        {
                            model: Profile,
                            as: 'profile', // Alias para o relacionamento de Profile
                            attributes: ['photo'], // Foto do perfil do autor
                        },
                    ],
                },
            ],
        });

        // Verifica se nenhuma postagem foi encontrada
        if (!posts.length) {
            return res.status(404).json({ message: 'Nenhuma postagem encontrada para este usuário.' });
        }

        const postsWithLiked = posts.map((post) => {
            // Verifica se o usuário logado (userId) está na lista de likes da postagem
            const liked = post.likes.some((like) => like.user.id === userId);
            const isAuthorPost = parseInt(post.authorId) === parseInt(userId)
            return {
                ...post.toJSON(),
                liked: liked, // Adiciona o campo 'liked'
                authorPost:isAuthorPost
            };
        });

        // Calcula postagens restantes
        const remainingPosts = totalPosts - endInt;

        res.status(200).json({
            posts: postsWithLiked,
            totalPosts,
            remainingPosts: remainingPosts < 0 ? 0 : remainingPosts,
        });
    } catch (error) {
        console.error('Erro ao buscar postagens do usuário:', error.message);
        res.status(500).json({ message: 'Erro ao buscar postagens do usuário.', error: error.message });
    }
};


// lista todos os posts não ativos
const getPaginatedPostsNotActive = async (req, res) => {
    const { start = 0, end = 10 } = req.query;

    // Garantir que start e end sejam numéricos
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);
    const userId = req.user.id;


    try {
        // Total de postagens
        const totalPosts = await Post.count();

        // Cálculo de limites
        const limit = endInt - startInt;
        const offset = startInt;

        // Busca postagens ordenadas e inclui os likes, os nomes dos usuários que deram os likes, foto do perfil, e as informações do autor da postagem
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: limit,  // Limite para a consulta
            offset: offset,  // Offset para a consulta
            where: { active: false }, // Garantir que só busque postagens ativas
            include: [
                
                {
                    model: User, // Inclui o modelo User para o autor da postagem
                    as: 'author',  // Alias que você deve ter configurado no relacionamento de Post com User
                    attributes: ['name'], // Nome do autor
                    include: [
                        {
                            model: Profile,
                            as: 'profile',  // Alias para o relacionamento de Profile
                            attributes: ['photo'],  // Foto do perfil do autor
                        }
                    ]
                },
            ],
        });

        // Verifica se nenhuma postagem foi encontrada
        if (!posts.length) {
            return res.status(404).json({ message: 'Nenhuma postagem encontrada.' });
        }

        // Calcula postagens restantes
        const remainingPosts = totalPosts - endInt;

        res.status(200).json({
            posts: posts,
            totalPosts,
            remainingPosts: remainingPosts < 0 ? 0 : remainingPosts,
        });
    } catch (error) {
        console.error('Erro ao buscar postagens paginadas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar postagens paginadas.', error: error.message });
    }
};

// lista todos os posts não aprovados
const getPaginatedPostsNotAproved = async (req, res) => {
    const { start = 0, end = 10 } = req.query;

    // Garantir que start e end sejam numéricos
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);
    const userId = req.user.id;


    try {
        // Total de postagens
        const totalPosts = await Post.count();

        // Cálculo de limites
        const limit = endInt - startInt;
        const offset = startInt;

        // Busca postagens ordenadas e inclui os likes, os nomes dos usuários que deram os likes, foto do perfil, e as informações do autor da postagem
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: limit,  // Limite para a consulta
            offset: offset,  // Offset para a consulta
            where: { approved: false }, // Garantir que só busque postagens ativas
            include: [
                
                {
                    model: User, // Inclui o modelo User para o autor da postagem
                    as: 'author',  // Alias que você deve ter configurado no relacionamento de Post com User
                    attributes: ['name'], // Nome do autor
                    include: [
                        {
                            model: Profile,
                            as: 'profile',  // Alias para o relacionamento de Profile
                            attributes: ['photo'],  // Foto do perfil do autor
                        }
                    ]
                },
            ],
        });

        // Verifica se nenhuma postagem foi encontrada
        if (!posts.length) {
            return res.status(404).json({ message: 'Nenhuma postagem encontrada.' });
        }

        // Calcula postagens restantes
        const remainingPosts = totalPosts - endInt;

        res.status(200).json({
            posts: posts,
            totalPosts,
            remainingPosts: remainingPosts < 0 ? 0 : remainingPosts,
        });
    } catch (error) {
        console.error('Erro ao buscar postagens paginadas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar postagens paginadas.', error: error.message });
    }
};

const getPaginatedPostsByAuthor = async (req, res) => {
    const { start = 0, end = 10, authorName = '' } = req.query;

    // Garantir que start e end sejam numéricos
    const startInt = parseInt(start, 10);
    const endInt = parseInt(end, 10);

    try {
        // Total de postagens que correspondem ao filtro
        const totalPosts = await Post.count({
            include: [
                {
                    model: User,
                    as: 'author',
                    where: {
                        name: {
                            [Op.like]: `%${authorName}%`, // Filtro pelo nome do autor
                        },
                    },
                },
            ],
            where: { approved: false }, // Apenas posts não aprovados
        });

        // Cálculo de limites
        const limit = endInt - startInt;
        const offset = startInt;

        // Busca postagens paginadas e filtradas pelo nome do autor
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset,
            where: { approved: false }, // Apenas posts inativos
            include: [
                {
                    model: User, // Inclui o modelo User para o autor da postagem
                    as: 'author',
                    where: {
                        name: {
                            [Op.like]: `%${authorName}%`, // Filtro pelo nome do autor
                        },
                    },
                    attributes: ['name'], // Apenas o nome do autor
                    include: [
                        {
                            model: Profile,
                            as: 'profile', // Inclui o relacionamento Profile
                            attributes: ['photo'], // Apenas a foto do perfil
                        },
                    ],
                },
            ],
        });

        // Verifica se nenhuma postagem foi encontrada
        if (!posts.length) {
            //return res.status(404).json({ message: 'Nenhuma postagem encontrada para este autor.' });
        }

        // Calcula postagens restantes
        const remainingPosts = totalPosts - endInt;

        res.status(200).json({
            posts: posts,
            totalPosts,
            remainingPosts: remainingPosts < 0 ? 0 : remainingPosts,
        });
    } catch (error) {
        console.error('Erro ao buscar postagens filtradas por autor:', error.message);
        res.status(500).json({ message: 'Erro ao buscar postagens filtradas por autor.', error: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    togglePostActive,
    togglePostApprove,
    getPaginatedPostsWithLikes,
    getPaginatedUserPostsWithLikes,
    getPaginatedPostsNotActive,
    getPaginatedPostsNotAproved,
    getPaginatedPostsByAuthor
};
