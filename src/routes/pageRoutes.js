const express = require('express');
const router = express.Router();

// Página inicial
router.get('/', (req, res) => {
  res.render('pages/home', { title: 'produtos' });
});

// Contato
router.get('/contato', (req, res) => {
  res.render('pages/contato', { title: 'contato' });
});

// Usuários
router.get('/usuarios', (req, res) => {
  res.render('pages/usuarios', { title: 'usuarios' });
});

// Produtos
router.get('/produtos', (req, res) => {
  res.render('pages/produtos', { title: 'produtos' });
});

// Sobre
router.get('/sobre', (req, res) => {
  res.render('pages/sobre', { title: 'Sobre Nós' });
});

module.exports = router;
