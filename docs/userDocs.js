/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@example.com
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               password:
 *                 type: string
 *                 example: senha123
 *               roles:
 *                 type: string
 *                 example: user
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Usuário já existe
 *       500:
 *         description: Erro ao criar usuário
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtém todos os usuários ativos
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários ativos
 *       500:
 *         description: Erro ao obter usuários
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtém um usuário ativo por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter usuário
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               phone:
 *                 type: string
 *                 example: "987654321"
 *               password:
 *                 type: string
 *                 example: novaSenha123
 *               roles:
 *                 type: string
 *                 example: admin
 *               active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */

/**
 * @swagger
 * /api/users/{id}/toggle-active:
 *   patch:
 *     summary: Ativa ou desativa um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Status do usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar o status do usuário
 */

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     summary: Obtém um usuário ativo por email
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Usuário ativo encontrado
 *       404:
 *         description: Usuário ativo não encontrado
 *       500:
 *         description: Erro ao obter usuário
 */
