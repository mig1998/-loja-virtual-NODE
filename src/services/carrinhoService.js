const CartModel = require("../models/cartModel");

exports.getAllCarrinho = async () => {
  return await CartModel.findAll();
};

exports.createCartForUser = async (userId) => {
  return await CartModel.createCartForUser(userId);
};

exports.findByUserId = async (userId) => {
  return await CartModel.findByUserId(userId);
};

exports.addProduto = async (userId, produtoId, quantidade) => {
  return await CartModel.addProduto(userId, produtoId, quantidade);
};

exports.removeProduto = async (userId, produtoId, quantidade) => {
  return await CartModel.removeProduto(userId, produtoId, quantidade);
};

exports.clearCart = async (userId) => {
  return await CartModel.clearCart(userId);
};

exports.getItems = async (userId) => {
  return await CartModel.getItems(userId);
};
