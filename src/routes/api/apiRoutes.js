const express = require('express');
const userController = require('../../controllers/userController');
const profileController = require('../../controllers/profileController');
const postController = require('../../controllers/postController');
const likeController = require('../../controllers/likeController');

const uploadService = require('../../services/UploadService');
const uploadProfileService = require('../../services/UploadProfileService');

const authMiddleware = require('../../middleware/authMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');

const router = express.Router();

// Rotas para usuários
router.post('/users', userController.createUser);
router.get('/users', authMiddleware, adminMiddleware, userController.getUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, userController.getUserById);
router.get('/users/email/:email', authMiddleware, adminMiddleware, userController.getUserByEmail);
router.put('/users/:id', authMiddleware, adminMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser);
router.patch('/users/:id/toggle-active', authMiddleware, adminMiddleware, userController.toggleUserActive);

//Rotas para postagens
router.get('/posts/paginated', authMiddleware, postController.getPaginatedPostsWithLikes);
router.post('/posts', authMiddleware, uploadService.uploadSingle(), postController.createPost);
router.get('/posts', authMiddleware, postController.getPosts);
router.get('/posts/:id', authMiddleware, postController.getPostById);
router.patch('/posts/:id/toggle-active', authMiddleware, postController.togglePostActive);

// Rotas para likes
router.post('/likes', authMiddleware, likeController.addLike);
router.get('/likes/:postId/likes', authMiddleware, likeController.getLikesByPost);
router.delete('/likes', authMiddleware, likeController.removeLike);

// Rota para criar o perfil
router.post('/profiles', authMiddleware, profileController.createProfile);
router.get('/profiles', authMiddleware, profileController.getProfileByUserId);
router.put('/profiles', authMiddleware, profileController.updateProfile);

router.post('/profiles/upload-photo', authMiddleware, uploadService.uploadSingle(), profileController.uploadProfilePhoto);


module.exports = router;
