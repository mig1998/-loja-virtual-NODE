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

// Meus Produtos
router.get('/meusprodutos', (req, res) => {
  res.render('pages/meusProdutos', { title: 'Meus produtos' });
});

// Produtos
router.get('/produtos', (req, res) => {
  res.render('pages/produtos', { title: 'produtos' });
});


// Produtos
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



// Login
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});


// Cadastro
router.get('/cadastro', (req, res) => {
  res.render('pages/cadastro', { title: 'Cadastro' });
});


// Carrinho
router.get('/carrinho', (req, res) => {
  res.render('pages/carrinho', { title: 'Carrinho' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const allUsers = users.findAll();
  const user = allUsers.find(u => u.email === email && u.password === password);

  if (user) {
    req.session.user = { id: user.id, name: user.name, type: user.type };
    return res.status(200).json({ message: 'Login bem-sucedido!' });
  }

  res.status(401).json({ message: 'Email ou senha inválidos' });
});



// router.use((req, res, next) => {
//   if (req.user) {
//     // Se o usuário estiver logado, permite que o request prossiga
//     next();
//   } else {
//     // Se não estiver logado, retorna erro
//     res.status(401).json({ message: 'Você precisa estar logado!' });
//   }
// });
module.exports = router;
