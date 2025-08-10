const carrinhoService = require('../services/carrinhoService');

// Buscar itens do carrinho do usuário logado
exports.getCarrinho = (req, res) => {
  const userId = req.session.user.id;
  const itens = carrinhoService.getCarrinhoByUserId(userId);
  res.status(200).json(itens);
};

// Adicionar produto ao carrinho do usuário logado
exports.adicionarProduto = (req, res) => {
  const userId = req.session.user.id;
  const { produtoId, quantidade } = req.body;

  if (!produtoId) {
    return res.status(400).json({ message: 'ProdutoId é obrigatório' });
  }

  const quantidadeNum = quantidade ? parseInt(quantidade) : 1;
  const carrinho = carrinhoService.addProdutoAoCarrinho(userId, produtoId, quantidadeNum);

  res.status(200).json(carrinho);
};

// Remover produto do carrinho do usuário logado
exports.removerProduto = (req, res) => {
  const userId = req.session.user.id;
  const { produtoId, quantidade } = req.body;

  if (!produtoId) {
    return res.status(400).json({ message: 'ProdutoId é obrigatório' });
  }

  const quantidadeNum = quantidade ? parseInt(quantidade) : 1;
  const carrinho = carrinhoService.removeProdutoDoCarrinho(userId, produtoId, quantidadeNum);

  res.status(200).json(carrinho);
};

// Limpar carrinho do usuário logado
exports.limparCarrinho = (req, res) => {
  const userId = req.session.user.id;
  const carrinho = carrinhoService.limparCarrinho(userId);
  res.status(200).json(carrinho);
};
