const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

const upload = require("../../config/multer"); // << AQUI
//

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
router.get('/', produtoController.getAllProdutos);



//router.post('/', produtoController.createProduto);

router.post("/", upload.single("image"), produtoController.createProduto);

// Rota: buscar por name
router.get('/name/:name', produtoController.getProdutoByName);

// buscar por categoria
router.get("/categoria/:categoria", produtoController.getProdutosByCategoria);


// Rota: buscar user
router.get('/user/produtos', produtoController.getMeusProdutos);


// Rota: buscar por id
router.get('/:id', produtoController.getProdutoById);

// Rota: atualizar
router.put('/:id', upload.single("image"), produtoController.updateProduto);

// Rota: deletar
router.delete('/:id', produtoController.deleteProduto);








module.exports = router;
