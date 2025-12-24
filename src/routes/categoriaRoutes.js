const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");


function adm(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.type !== 'admin') {
    return res.status(403).send('Acesso negado: apenas administradores');
  }

  next();
}






router.get("/", categoriaController.getCategorias);


router.post("/", categoriaController.createCategoria);


// Rota: atualizar
router.put('/:id', categoriaController.updateCategoria);

router.delete("/:id", categoriaController.deleteCategoria);



module.exports = router;