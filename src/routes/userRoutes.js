const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');



// Definir rotas
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

// Rota: buscar por id
router.get('/:id', userController.getUserById);

// Rota: atualizar
router.put('/:id', userController.updateUser);

// Rota: deletar
router.delete('/:id', userController.deleteUser);


module.exports = router;
