const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

//

// Definir rotas
router.get('/', produtoController.getAllProdutos);
router.post('/', produtoController.createProduto);

// Rota: buscar por name
router.get('/name/:name', produtoController.getProdutoByName);


// Rota: buscar user
router.get('/user/produtos', produtoController.getMeusProdutos);


// Rota: buscar por id
router.get('/:id', produtoController.getProdutoById);

// Rota: atualizar
router.put('/:id', produtoController.updateProduto);

// Rota: deletar
router.delete('/:id', produtoController.deleteProduto);




// router.get('/buscar', (req, res) => {
//   const termo = req.query.q.toLowerCase();

//   // Simulação: busca em uma lista estática
//   const todos = produtos.findAll(); // ou produtos.getTodos(), depende do seu model

//   const resultados = todos.filter(p =>
//     p.nome.toLowerCase().includes(termo) ||
//     p.descricao.toLowerCase().includes(termo)
//   );

//   res.render('pages/produtos', { title: 'Busca', produtos: resultados });
// });

module.exports = router;
