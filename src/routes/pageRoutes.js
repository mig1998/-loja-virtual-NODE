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



function adm(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.type !== 'admin') {
    return res.status(403).send('Acesso negado: apenas administradores');
  }

  next();
}



// Página inicial
router.get('/', (req, res) => {
  res.render('pages/produtos', { title: 'Produtos' });
});

//buscar produto
router.get('/buscar', (req, res) => {
  res.render('pages/buscar', { title: 'resultado da busca' });
});

// Criar Produto
router.get('/cadastroproduto', autenticar, (req, res) => {
  res.render('pages/cadastroProduto', { title: 'cadastro Produto', user: req.session.user });
});


// Meus Produtos
router.get('/meusprodutos', autenticar, (req, res) => {
  res.render('pages/meusProdutos', { title: 'Meus produtos', user: req.session.user });
});

// Produtos
/*
router.get('/produtos', (req, res) => {
  res.render('pages/produtos', { title: 'produtos' });
}); 
*/

//editar produto
router.get('/editProduto', autenticar,(req, res) => {
  res.render('pages/editProduto', { title: 'editar Produto',user:req.session.user });
}); 


//editar Usuario
router.get('/editUser', autenticar,(req, res) => {
  res.render('pages/editUser', { title: 'editar Usuario',user:req.session.user });
}); 

// admin
router.get('/admin', autenticar, adm, (req, res) => {
  res.render('pages/admin', { title: 'admin', user: req.session.user });
});


// Usuarios
router.get('/usuarios', autenticar,adm, (req, res) => {
  res.render('pages/usuarios', { title: 'usuarios', user: req.session.user });
});

// catwgorias
router.get('/categoria', autenticar,adm, (req, res) => {
  res.render('pages/categoria', { title: 'usuarios', user: req.session.user });
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


// meu perfil
router.get('/meuPerfil', autenticar, (req, res) => {
  res.render('pages/meuPerfil', { title: 'meu Perfil', user: req.session.user });
});


//logar
const UserModel = require('../models/userModel');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await UserModel.findByEmailAndSenha(email, senha);

    if (user) {
      req.session.user = { id: user._id, name: user.name, image:user.image ,type: user.type};
      return res.status(200).json({ message: 'Login bem-sucedido!' });
    }

    res.status(401).json({ message: 'Email ou senha inválidos' });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: 'Erro interno' });
  }
});





// Carrinho
router.get('/carrinho', (req, res) => {
  res.render('pages/carrinho', { title: 'Carrinho' });
});


// logout
router.get('/logout', (req, res) => {
  res.render('pages/logout', { title: 'logout' });
});


module.exports = router;
