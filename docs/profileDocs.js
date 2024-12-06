/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Endpoints para gerenciamento de perfis de usuários
 */

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Cria um novo perfil para o usuário, também atualiza os dados nickname e birthDate se enviado no mesmo end point.
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "João"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nickname:
 *                   type: string
 *                   example: "João"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Perfil já existe para o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil já existe para este usuário."
 *       500:
 *         description: Erro ao criar perfil
 */

/**
 * @swagger
 * /api/profiles/{userId}:
 *   get:
 *     summary: Obtém o perfil do usuário
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Perfil obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nickname:
 *                   type: string
 *                   example: "João"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil não encontrado."
 *       500:
 *         description: Erro ao obter perfil
 */

/**
 * @swagger
 * /api/profiles/{userId}:
 *   put:
 *     summary: Atualiza o perfil do usuário
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "João Silva"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               photo:
 *                 type: string
 *                 format: uri
 *                 example: "http://example.com/storage/profiles/photo.jpg"
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nickname:
 *                   type: string
 *                   example: "João Silva"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 photo:
 *                   type: string
 *                   format: uri
 *                   example: "http://example.com/storage/profiles/photo.jpg"
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil não encontrado."
 *       500:
 *         description: Erro ao atualizar perfil
 */

/**
 * @swagger
 * /api/profiles/photo:
 *   post:
 *     summary: Faz upload da foto do perfil do usuário
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Foto do perfil a ser enviada
 *     responses:
 *       200:
 *         description: Foto do perfil atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foto do perfil atualizada com sucesso."
 *                 profile:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nickname:
 *                       type: string
 *                       example: "João Silva"
 *                     birthDate:
 *                       type: string
 *                       format: date
 *                       example: "1990-01-01"
 *                     photo:
 *                       type: string
 *                       format: uri
 *                       example: "http://example.com/storage/profiles/photo.jpg"
 *       400:
 *         description: Foto é obrigatória
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foto é obrigatória."
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil não encontrado."
 *       500:
 *         description: Erro ao atualizar foto do perfil
 */
