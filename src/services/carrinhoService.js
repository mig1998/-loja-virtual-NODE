const CarrinhoModel = require('../models/carrinhoModel');

exports.getCarrinhoByUserId = (userId) => {
  return CarrinhoModel.getItems(userId);
};

exports.addProdutoAoCarrinho = (userId, produtoId, quantidade = 1) => {
  return CarrinhoModel.addProduto(userId, produtoId, quantidade);
};

exports.removeProdutoDoCarrinho = (userId, produtoId, quantidade = 1) => {
  return CarrinhoModel.removeProduto(userId, produtoId, quantidade);
};

exports.limparCarrinho = (userId) => {
  return CarrinhoModel.clearCart(userId);
};
