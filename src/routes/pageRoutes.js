const express = require('express');
const users = require('../models/userModel');

const router = express.Router();




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
router.get('/usuarios', (req, res) => {
  res.render('pages/usuarios', { title: 'usuarios' });
});

// Contato
router.get('/contato', (req, res) => {
  res.render('pages/contato', { title: 'contato' });
});



// Sobre
router.get('/sobre', (req, res) => {
  res.render('pages/sobre', { title: 'Sobre Nós' });
});


//login
router.post('/login', (req, res) => {
  const { email, password } = req.body;  // Pega os dados do login


  const allUsers = users.findAll();  // Pega todos os usuários

  const user = allUsers.find(u => u.email === email && u.password === password);

  if (user) {
    // Simulando um usuário logado (armazenando a informação na requisição)
    req.user = user;
    return res.status(200).json({ message: 'Login bem-sucedido!', user });
  }

  res.status(401).json({ message: 'Email ou senha incorretos!' });
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
