const Profile = require('../models/Profile');
const User = require('../models/User');  // Importa o modelo User
const fs = require('fs');
const path = require('path');

// Criar perfil
const createProfile = async (req, res) => {
    try {
        const { nickname, birthDate } = req.body;
        const userId = req.user.id; // Obtém o ID do usuário autenticado

        // Verificar se o usuário já tem um perfil
        const existingProfile = await Profile.findOne({ where: { userId } });
        if (existingProfile) {
            return res.status(400).json({ message: 'Perfil já existe para este usuário.' });
        }

        // Criar novo perfil
        const newProfile = await Profile.create({
            nickname,
            birthDate,
            userId, // Associa o perfil ao usuário autenticado
        });

        return res.status(201).json(newProfile);
    } catch (error) {
        console.error('Erro ao criar perfil:', error.message);
        return res.status(500).json({ message: 'Erro ao criar perfil.', error: error.message });
    }
};

const getProfileByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Pega o ID do usuário autenticado

        // Busca o perfil do usuário
        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        return res.status(200).json(profile);
    } catch (error) {
        console.error('Erro ao recuperar perfil:', error.message);
        return res.status(500).json({ message: 'Erro ao recuperar perfil.', error: error.message });
    }
};

// Alterar perfil do usuário
const updateProfile = async (req, res) => {
    try {
        const { nickname, birthDate, photo } = req.body;  // Dados a serem alterados
        const userId = req.user.id;  // ID do usuário autenticado

        // Verifica se o perfil existe
        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        // Atualiza o perfil
        profile.nickname = nickname || profile.nickname; // Atualiza nickname, se fornecido
        profile.birthDate = birthDate || profile.birthDate; // Atualiza birthDate, se fornecido
        profile.photo = photo || profile.photo; // Atualiza photo, se fornecida

        await profile.save(); // Salva as alterações no banco

        return res.status(200).json(profile);  // Retorna o perfil atualizado
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error.message);
        return res.status(500).json({ message: 'Erro ao atualizar perfil.', error: error.message });
    }
};

const uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.user.id; // ID do usuário autenticado
        const photo = req.file; // A foto foi armazenada por multer e está em `req.file`

        if (!photo) {
            return res.status(400).json({ message: 'Foto é obrigatória.' });
        }

        // Busca o perfil do usuário
        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        // Atualiza o caminho da foto no perfil
        profile.photo = path.join('storage/profiles', photo.filename); // Caminho da imagem no diretório

        await profile.save(); // Salva o perfil atualizado com a nova foto

        return res.status(200).json({
            message: 'Foto do perfil atualizada com sucesso.',
            profile,
        });
    } catch (error) {
        console.error('Erro ao atualizar foto do perfil:', error.message);
        return res.status(500).json({ message: 'Erro ao atualizar foto do perfil.', error: error.message });
    }
};

module.exports = {
    createProfile,
    getProfileByUserId,
    updateProfile,
    uploadProfilePhoto,
};
