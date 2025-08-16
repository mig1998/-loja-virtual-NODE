const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

function autenticar(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.post("/create", carrinhoController.createCart);

router.post("/add", carrinhoController.addProduto);

router.post("/remove", carrinhoController.removeProduto);

router.post("/clear", carrinhoController.clearCart);

router.get("/:userId", carrinhoController.getItems);


module.exports = router;
