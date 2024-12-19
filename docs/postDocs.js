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
 *     summary: Cria uma nova postagem com título, texto e imagem
 *     tags: [Postagens]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *                 format: binary
 *                 description: "Imagem da postagem"
 *               active:
 *                 type: boolean
 *                 example: true
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

/**
 * @swagger
 * /api/posts/{id}/toggleApprove:
 *   patch:
 *     summary: Ativa ou desativa a aprovação de uma postagem
 *     tags: [Postagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem a ser ativada ou desativada
 *     responses:
 *       200:
 *         description: Postagem teve seu status de aprovação alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem indicando o status atualizado da postagem
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID da postagem
 *                     title:
 *                       type: string
 *                       description: Título da postagem
 *                     text:
 *                       type: string
 *                       description: Conteúdo da postagem
 *                     image:
 *                       type: string
 *                       description: URL da imagem da postagem (se disponível)
 *                     active:
 *                       type: boolean
 *                       description: Status de ativação da postagem
 *                     approved:
 *                       type: boolean
 *                       description: Status de aprovação da postagem
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Data de criação ou atualização da postagem
 *       404:
 *         description: Postagem não encontrada
 *       500:
 *         description: Erro ao alterar o status de aprovação da postagem
 */



/**
 * @swagger
 * /api/posts/paginated:
 *   get:
 *     summary: Obtém postagens paginadas com likes e informações dos usuários
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Início da páginação (padrão 0)"
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Fim da páginação (padrão 10)"
 *     responses:
 *       200:
 *         description: Lista de postagens paginadas com likes e informações dos usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 totalPosts:
 *                   type: integer
 *                 remainingPosts:
 *                   type: integer
 *       404:
 *         description: Nenhuma postagem encontrada
 *       500:
 *         description: Erro ao buscar postagens paginadas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         text:
 *           type: string
 *         image:
 *           type: string
 *         active:
 *           type: boolean
 *         createdAt: 
 *           type: string
 *         author:
 *           type: string
 *         liked:
 *           type: boolean
 *         likes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Like'
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             profile:
 *               type: object
 *               properties:
 *                 photo:
 *                   type: string
 */

/**
 * @swagger
 * /api/posts/user/paginated:
 *   get:
 *     summary: Obtém postagens paginadas de um usuário específico com likes e informações dos usuários
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Início da paginação (padrão 0)"
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Fim da paginação (padrão 10)"
 *     security:
 *       - bearerAuth: []  # Indica que é necessário o token Bearer
 *     responses:
 *       200:
 *         description: Lista de postagens paginadas do usuário com likes e informações dos usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 totalPosts:
 *                   type: integer
 *                   description: Total de postagens do usuário
 *                 remainingPosts:
 *                   type: integer
 *                   description: Quantidade de postagens restantes
 *       404:
 *         description: Nenhuma postagem encontrada para o usuário
 *       500:
 *         description: Erro ao buscar postagens do usuário paginadas
 */

/**
 * @swagger
 * /api/posts/paginatedNotActive:
 *   get:
 *     summary: Obtém postagens não ativas de forma paginada
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Início da paginação (padrão 0)"
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Fim da paginação (padrão 10)"
 *     responses:
 *       200:
 *         description: Lista de postagens não ativas com informações de autor e likes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 totalPosts:
 *                   type: integer
 *                   description: Total de postagens não ativas
 *                 remainingPosts:
 *                   type: integer
 *                   description: Quantidade de postagens não ativas restantes
 *       404:
 *         description: Nenhuma postagem não ativa encontrada
 *       500:
 *         description: Erro ao buscar postagens não ativas
 */

/**
 * @swagger
 * /api/posts/paginatedByAuthor:
 *   get:
 *     summary: Obtém postagens não aprovadas de forma paginada por autor
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Início da paginação (padrão 0)"
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Fim da paginação (padrão 10)"
 *       - in: query
 *         name: authorName
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
 *         description: "Nome ou parte do nome do autor para filtrar as postagens"
 *     responses:
 *       200:
 *         description: Lista de postagens não aprovadas filtradas por autor, com informações detalhadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID da postagem
 *                       title:
 *                         type: string
 *                         description: Título da postagem
 *                       text:
 *                         type: string
 *                         description: Conteúdo da postagem
 *                       image:
 *                         type: string
 *                         description: URL da imagem da postagem (se disponível)
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação da postagem
 *                       approved:
 *                         type: boolean
 *                         description: Status de aprovação da postagem
 *                       author:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Nome do autor
 *                           profile:
 *                             type: object
 *                             properties:
 *                               photo:
 *                                 type: string
 *                                 description: URL da foto do perfil do autor
 *                 totalPosts:
 *                   type: integer
 *                   description: Total de postagens não aprovadas que correspondem ao filtro
 *                 remainingPosts:
 *                   type: integer
 *                   description: Quantidade de postagens restantes na consulta
 *       404:
 *         description: Nenhuma postagem encontrada para o autor especificado
 *       500:
 *         description: Erro ao buscar postagens filtradas por autor
 */

/**
 * @swagger
 * /api/posts/paginatedNotApproved:
 *   get:
 *     summary: Obtém postagens não aprovadas de forma paginada
 *     tags: [Postagens]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Início da paginação (padrão 0)"
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Fim da paginação (padrão 10)"
 *     responses:
 *       200:
 *         description: Lista de postagens não aprovadas com informações de autor e perfil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID da postagem
 *                       title:
 *                         type: string
 *                         description: Título da postagem
 *                       text:
 *                         type: string
 *                         description: Conteúdo da postagem
 *                       image:
 *                         type: string
 *                         description: URL da imagem da postagem (se disponível)
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação da postagem
 *                       approved:
 *                         type: boolean
 *                         description: Status de aprovação da postagem
 *                       author:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Nome do autor da postagem
 *                           profile:
 *                             type: object
 *                             properties:
 *                               photo:
 *                                 type: string
 *                                 description: URL da foto do perfil do autor
 *                 totalPosts:
 *                   type: integer
 *                   description: Total de postagens não aprovadas
 *                 remainingPosts:
 *                   type: integer
 *                   description: Quantidade de postagens restantes na consulta
 *       404:
 *         description: Nenhuma postagem não aprovada encontrada
 *       500:
 *         description: Erro ao buscar postagens não aprovadas
 */
