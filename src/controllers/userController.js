const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('../models/User'); 
const Profile = require('../models/Profile');

// 1. Criar Usuário
const createUser = async (req, res) => {
    const { name, email, phone, password, roles, active } = req.body;    

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);
        // Cria o novo usuário
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            roles, 
            active
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

// 2. Obter Todos os Usuários
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {                 
                active: true 
            },
            include: [
                {
                    model: Profile,
                    as: 'profile',
                    attributes: ['photo'], // Foto do perfil
                }
            ],
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuários', error });
    }
};

const getUserStatus = async (req, res) => {
    try {
        const { name } = req.query;

        // Definir condição de filtro com base no parâmetro `name`
        const whereCondition = name 
            ? { name: { [Op.like]: `%${name}%` } } 
            : {};

        const users = await User.findAll({
            where: whereCondition, // Filtro opcional
            include: [
                {
                    model: Profile,
                    as: 'profile',
                    attributes: ['photo'], // Foto do perfil
                }
            ],
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuários', error });
    }
};

// 3. Obter Usuário por ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({            
            where: {
                id,
                active: true
            },
            include: [
                {
                    model: Profile,
                    as: 'profile',
                    attributes: ['photo'], // Foto do perfil
                }
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
};

// 4. Atualizar Usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, roles, active } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualiza os campos fornecidos
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        user.name = name || user.name;
        //user.email = email || user.email;
        user.phone = phone || user.phone;
        user.roles = roles || user.roles;
        user.active = active !== undefined ? active : user.active;

        await user.save();

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
};

// 5. Deletar Usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await user.destroy();

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};

// 6. Ativar/Desativar Usuário
const toggleUserActive = async (req, res) => {
    const { id } = req.params;

    try {
        // Busca o usuário pelo ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Alterna o estado do campo 'active' (ativo <-> desativado)
        user.active = !user.active;

        // Salva a alteração no banco de dados
        await user.save();

        return res.status(200).json({ 
            message: `Usuário ${user.active ? 'ativado' : 'desativado'} com sucesso`, 
            user 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar o status do usuário', error });
    }
};

// 7. Obter Usuário Ativo por Email
const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        // Filtra apenas usuários ativos pelo email
        const user = await User.findOne({
            where: {
                email,
                active: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário ativo não encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
};



module.exports = {
    createUser,
    getUsers,
    getUserStatus,
    getUserById,
    updateUser,
    deleteUser,
    toggleUserActive,
    getUserByEmail
};
