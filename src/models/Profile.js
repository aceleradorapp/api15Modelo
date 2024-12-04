const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');  // Importa o modelo User

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,  // Foto agora pode ser nula
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,  // Nickname é obrigatório
        unique: true, // Garantir que o nickname seja único
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false, // Data de nascimento é obrigatória
    },
    creationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,  // Data de criação do perfil será o momento atual
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  // Relacionamento com o modelo User
            key: 'id',  // Chave primária do modelo User
        },
    },
}, {
    tableName: 'profiles',
    timestamps: false,  // Não há necessidade de createdAt/updatedAt neste modelo
});

// Definindo o relacionamento
// Profile.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',  // Relacionamento com o modelo User
// });

// User.hasOne(Profile, {
//     foreignKey: 'userId',
//     as: 'profile',  // Relacionamento com o modelo Profile
// });

module.exports = Profile;
