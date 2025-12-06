const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const upload = require("../../config/multer"); //

// Definir rotas
router.get('/', userController.getAllUsers);

router.post('/', upload.single("image"), userController.createUser);


// Rota: buscar por nome
router.get('/name/:name', userController.getUserByName);

// Rota: buscar por id
router.get('/:id', userController.getUserById);






// Rota: atualizar
router.put('/:id', upload.single("image"), userController.updateUser);

// Rota: deletar
router.delete('/:id', userController.deleteUser);


router.post('/logout', userController.logout);

module.exports = router;
