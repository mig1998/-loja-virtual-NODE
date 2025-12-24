const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const upload = require("../../config/multer"); //

function adm(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.type !== 'admin') {
    return res.status(403).send('Acesso negado: apenas administradores');
  }

  next();
}






// Definir rotas
router.get('/', userController.getAllUsers);

router.post('/', upload.single("image"), userController.createUser);


// Rota: buscar por nome
router.get('/name/:name', userController.getUserByName);


router.get('/perfil', userController.getUserPerfil); 

router.get('/:id', userController.getUserById);





// Rota: atualizar
router.put('/:id', upload.single("image"), userController.updateUser);

// Rota: deletar
router.delete('/:id', userController.deleteUser);


router.post('/logout', userController.logout);

module.exports = router;