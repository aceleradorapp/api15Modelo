
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garantir que o email seja único
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.ENUM('owner', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user', // Role padrão será 'user'
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Por padrão, o usuário será ativo
    },
}, {
    tableName: 'users',
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = User;
