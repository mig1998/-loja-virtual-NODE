const express = require('express');
const router = express.Router();
//const carrinhoController = require('../controllers/carrinhoController');

function autenticar(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}



module.exports = router;
