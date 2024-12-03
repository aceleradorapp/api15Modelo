const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do armazenamento para o upload da imagem do perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'storage/profiles';
        // Cria o diretório caso ele não exista
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Diretório onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
    },
});

// Filtro para permitir apenas imagens
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Erro: Arquivo deve ser uma imagem.');
    }
};

// Middleware para upload de uma única imagem (foto do perfil)
const uploadSingle = () => multer({
    storage,
    fileFilter,
}).single('image'); // O campo 'image' no formulário de upload

module.exports = { uploadSingle };
