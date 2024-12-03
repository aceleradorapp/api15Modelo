/**
 * @swagger
 * tags:
 *   name: Postagens
 *   description: Endpoints para gerenciamento de postagens
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Postagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Minha primeira postagem"
 *               text:
 *                 type: string
 *                 example: "Este é o conteúdo da postagem."
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               active:
 *                 type: boolean
 *                 example: true
 *               
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar postagem
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtém todas as postagens
 *     tags: [Postagens]
 *     responses:
 *       200:
 *         description: Lista de postagens
 *       500:
 *         description: Erro ao obter postagens
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obtém uma postagem por ID
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Postagem encontrada
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro ao obter postagem
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualiza uma postagem por ID
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Postagem atualizada"
 *               text:
 *                 type: string
 *                 example: "Conteúdo atualizado da postagem."
 *               image:
 *                 type: string
 *                 example: "http://example.com/updated_image.jpg"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro ao atualizar postagem
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Deleta uma postagem por ID
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Postagem deletada com sucesso
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro ao deletar postagem
 */

/**
 * @swagger
 * /api/posts/{id}/toggle-active:
 *   patch:
 *     summary: Ativa ou desativa uma postagem por ID
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Status da postagem atualizado com sucesso
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro ao atualizar o status da postagem
 */
