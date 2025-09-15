const CartService = require("../services/carrinhoService");
const userController = require('../controllers/userController');



exports.getAllCarts = (req, res) => {
  const carts = CartService.getAllCarrinho();
  res.status(200).json(carts);
};


exports.createCart = (req, res) => {
  console.log("📥 Dados recebidos:", req.body);

  const { userId } = req.body || {};
  if (!userId) {
    return res.status(400).json({ error: "Informe o userId" });
  }

  const cart = CartService.createCartForUser(userId);

  // Garante que o usuário tenha esse carrinho associado
  userController.adicionarCarrinhoAoUsuario(userId, cart.id);

  return res.status(201).json({
    message: "Carrinho criado com sucesso!",
    carrinho: cart
  });
};
exports.addProduto = (req, res) => {
  const { userId, produtoId, quantidade } = req.body;

  if (!userId || !produtoId) {
    return res.status(400).json({ error: "Informe userId e produtoId" });
  }
  // const cartCRIADO = CartService.createCartForUser(userId);
  // res.json(cartCRIADO);

  const cart = CartService.addProduto(userId, produtoId, quantidade || 1);
  res.json(cart);
}

exports.removeProduto = (req, res) => {
  const { userId, produtoId, quantidade } = req.body;

  if (!userId || !produtoId) {
    return res.status(400).json({ error: "Informe userId e produtoId" });
  }

  const cart = CartService.removeProduto(userId, produtoId, quantidade || 1);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  res.json(cart);
}

exports.clearCart = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Informe o userId" });
  }

  const cart = CartService.clearCart(userId);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  res.json(cart);
}

exports.getItems = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Informe o userId" });
  }

  const items = CartService.getItems(userId);
  res.json(items);
}
