const CartModel = require("../models/carrinhoModel");

class CartService {
  static createCartForUser(userId) {
    return CartModel.createCartForUser(userId);
  }

  static addProduto(userId, produtoId, quantidade) {
    return CartModel.addProduto(userId, produtoId, quantidade);
  }

  static removeProduto(userId, produtoId, quantidade) {
    return CartModel.removeProduto(userId, produtoId, quantidade);
  }

  static clearCart(userId) {
    return CartModel.clearCart(userId);
  }

  static getItems(userId) {
    return CartModel.getItems(userId);
  }
}

module.exports = CartService;
