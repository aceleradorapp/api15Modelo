/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Endpoints para gerenciamento de likes
 */

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Adiciona um like a uma postagem
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Like adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like adicionado com sucesso."
 *                 like:
 *                   type: object
 *       400:
 *         description: O usuário já curtiu a postagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Você já curtiu este post."
 *       500:
 *         description: Erro ao adicionar like
 */

/**
 * @swagger
 * /api/likes:
 *   delete:
 *     summary: Remove um like de uma postagem
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Like removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like removido com sucesso."
 *       404:
 *         description: Like não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like não encontrado."
 *       500:
 *         description: Erro ao remover like
 */

/**
 * @swagger
 * /api/likes/{postId}/likes:
 *   get:
 *     summary: Obtém todos os likes de uma postagem
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Lista de likes obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "João Silva"
 *       500:
 *         description: Erro ao buscar likes
 */
