const express = require('express');
const users = require('../models/userModel');

const router = express.Router();

function autenticar(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}



// Página inicial
router.get('/', (req, res) => {
  res.render('pages/home', { title: 'home' });
});


// Criar Produto
router.get('/cadastroproduto', autenticar, (req, res) => {
  res.render('pages/cadastroProduto', { title: 'cadastroProduto', user: req.session.user });
});


// Meus Produtos
router.get('/meusprodutos', autenticar,(req, res) => {
  res.render('pages/meusProdutos', { title: 'Meus produtos', user: req.session.user });
});

// Produtos
router.get('/produtos', (req, res) => {
  res.render('pages/produtos', { title: 'produtos' });
});


// Usuarios
router.get('/usuarios', autenticar, (req, res) => {
  res.render('pages/usuarios', { title: 'usuarios', user: req.session.user });
});

// Contato
router.get('/contato', (req, res) => {
  res.render('pages/contato', { title: 'contato' });
});



// Sobre
router.get('/sobre', (req, res) => {
  res.render('pages/sobre', { title: 'Sobre Nós' });
});



// Login Usuario
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});


// Cadastro Usuario
router.get('/cadastroUsuario', (req, res) => {
  res.render('pages/cadastroUsuario', { title: 'Cadastro' });
});



//logar
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const allUsers = users.findAll();
  const user = allUsers.find(u => u.email === email && u.senha === senha);


  if (user) {
    req.session.user = { id: user.id, name: user.name, type: user.type };
    return res.status(200).json({ message: 'Login bem-sucedido!' });
  }

  res.status(401).json({ message: 'Email ou senha inválidos' });
});




// Carrinho
router.get('/carrinho', (req, res) => {
  res.render('pages/carrinho', { title: 'Carrinho' });
});


// Carrinho
router.get('/logout', (req, res) => {
  res.render('pages/logout', { title: 'logout' });
});


module.exports = router;
