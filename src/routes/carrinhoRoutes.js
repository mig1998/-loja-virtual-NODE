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

const { adm } = require("./controleAcesso");



router.get("/",adm, carrinhoController.getAllCarts);

router.get("/cart", carrinhoController.getCart);

router.post("/create", carrinhoController.createCart);

router.post("/add", carrinhoController.addProduto);

router.post("/remove", carrinhoController.removeProduto);

router.post("/clear", carrinhoController.clearCart);


router.post("/checkout/fake", carrinhoController.checkout);

router.get("/:userId", carrinhoController.getItems);

// router.get("/cart/:userId", carrinhoController.getCarrinhoByUser);

module.exports = router;
