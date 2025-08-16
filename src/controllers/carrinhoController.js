const CartService = require("../services/carrinhoService");

class CartController {
  static createCart(req, res) {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Informe o userId" });
    }

    const cart = CartService.createCartForUser(userId);
    res.json(cart);
  }

  static addProduto(req, res) {
    const { userId, produtoId, quantidade } = req.body;

    if (!userId || !produtoId) {
      return res.status(400).json({ error: "Informe userId e produtoId" });
    }

    const cart = CartService.addProduto(userId, produtoId, quantidade || 1);
    res.json(cart);
  }

  static removeProduto(req, res) {
    const { userId, produtoId, quantidade } = req.body;

    if (!userId || !produtoId) {
      return res.status(400).json({ error: "Informe userId e produtoId" });
    }

    const cart = CartService.removeProduto(userId, produtoId, quantidade || 1);
    if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

    res.json(cart);
  }

  static clearCart(req, res) {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Informe o userId" });
    }

    const cart = CartService.clearCart(userId);
    if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

    res.json(cart);
  }

  static getItems(req, res) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Informe o userId" });
    }

    const items = CartService.getItems(userId);
    res.json(items);
  }
}

module.exports = CartController;
