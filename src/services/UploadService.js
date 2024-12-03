const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Caminho onde as imagens serão armazenadas
const uploadDirectory = path.join(__dirname, '../../storage/posts');

// Cria o diretório se ele não existir
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Caminho onde as imagens serão armazenadas
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        // Nome do arquivo com timestamp para evitar conflitos de nomes
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Definir tipos de arquivos permitidos (exemplo: apenas imagens JPEG, JPG e PNG)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Apenas imagens JPEG, JPG e PNG são permitidas.'));
    }
};

class UploadService {
    constructor() {
        // Cria a instância do multer com a configuração de armazenamento e validação
        this.upload = multer({
            storage: storage,
            fileFilter: fileFilter,
        });
    }

    // Método para carregar um único arquivo
    uploadSingle() {
        return this.upload.single('image');
    }
}

module.exports = new UploadService();
