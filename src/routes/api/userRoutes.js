const express = require('express');
const userController = require('../../controllers/userController');
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

module.exports = router;
