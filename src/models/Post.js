const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');  // Importando o modelo User corretamente

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {  // Corrigi de `image` para `imageUrl` para refletir o campo correto no modelo
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    authorId: {  // Certifique-se de que o campo seja `authorId` conforme o modelo
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Associando com o modelo User
            key: 'id',
        },
    },
    active: {  // Novo campo active
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Define o valor padrão como false
    },
}, {
    tableName: 'posts',
    timestamps: false,  // Não adicionaremos createdAt e updatedAt, pois já definimos manualmente
});

// Definindo o relacionamento
//Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });



module.exports = Post;
