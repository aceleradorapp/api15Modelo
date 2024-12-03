const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API - Documentação",
            version: "1.0.0",
            description: "Documentação da API do projeto.",
        },
        servers: [
            {
                url: "http://localhost:3535", // URL base da sua API
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        path.join(__dirname, "../../docs/*.js"), // Referência aos arquivos de documentação
        path.join(__dirname, "../../docs/postDocs.js"), // Adiciona o arquivo postDocs.js
        path.join(__dirname, "../../docs/likeDocs.js"), // Adiciona o arquivo likeDocs.js
        path.join(__dirname, "../../docs/profileDocs.js"), // Adiciona o arquivo likeDocs.js
    ],
};


const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
