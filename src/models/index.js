const sequelize = require('../config/dbConfig'); // Configuração do Sequelize
const User = require('./User');                  // Modelo User
const Profile = require('./Profile');           // Modelo Profile
const Post = require('./Post');                 // Modelo Post
const Like = require('./Like');                 // Modelo Like

User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' }); // Relacionamento com o modelo Profile
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Relacionamento com o modelo User

// Configuração dos relacionamentos
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' }); // Um usuário pode ter vários posts
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' }); // Um post pertence a um autor

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' }); // Um usuário pode dar vários likes
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' }); // Um post pode ter vários likes
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Um like pertence a um usuário
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' }); // Um like pertence a um post

// Exportar Sequelize e modelos
module.exports = {
    sequelize,
    User,
    Post,
    Like,
};
