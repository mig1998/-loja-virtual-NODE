const CartModel = require("../models/cartModel");


exports.getAllCarrinho = () => {
  return CartModel.findAll();
};


exports.createCartForUser = (userId) => {
  return CartModel.createCartForUser(userId);
}


exports.findByUserId = (userId) => {
  return CartModel.findByUserId(userId);
};


exports.addProduto = (userId, produtoId, quantidade) => {
  return CartModel.addProduto(userId, produtoId, quantidade);
}

exports.removeProduto = (userId, produtoId, quantidade) => {
  return CartModel.removeProduto(userId, produtoId, quantidade);
}

exports.clearCart = (userId) => {
  return CartModel.clearCart(userId);
}

exports.getItems = (userId) => {
  return CartModel.getItems(userId);
}


