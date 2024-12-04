require('dotenv').config();
const express = require('express');
const path = require('path');
const { swaggerUi, specs, optionsSwaggerUi } = require("./src/config/swaggerConfig");
//const sequelize = require('./src/config/dbConfig');
const { sequelize } = require('./src/models/index');
//const bodyParser = require('body-parser');
const cors = require('cors');
//const User = require('./src/models/User');
//const Post = require('./src/models/Post');
const pagesRoutes = require('./src/routes/pages/pages');
const apiRoutes = require('./src/routes/api/apiRoutes'); 
const authRoutes = require('./src/routes/api/authRoutes');

const app = express();
const port = process.env.PORT || 3530;

app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
}));

// Sincronizar os modelos com o banco de dados
sequelize.sync({ force: false })  // `force: false` impede a remoção da tabela se ela já existir
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

// Middleware para parse de JSON
app.use(express.json());

// Servir arquivos estáticos da pasta /public
app.use(express.static(path.join(__dirname, 'src/public')));
// Configurar o motor de template (EJS neste caso)
app.set('views', path.join(__dirname, 'src/views'));
app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


// Configurar as rotas de páginas
app.use('/', pagesRoutes);

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`); 
}); 
