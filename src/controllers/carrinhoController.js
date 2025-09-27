const CartService = require("../services/carrinhoService");
const userController = require('../controllers/userController');
const UserService = require("../services/userService");

exports.getAllCarts = async (req, res) => {
  const carts = await CartService.getAllCarrinho();
  res.status(200).json(carts);
};

exports.getCart = async (req, res) => {
  const userSession = req.session.user;
  const carts = await CartService.getAllCarrinho();

  let resultado;
  if (!userSession) {
    resultado = [];
  } else {
    resultado = carts.filter(cart => cart.userId === userSession.id);
  }

  res.status(200).json(resultado);
};

exports.createCart = async (req, res) => {
  const { userId } = req.body || {};
  if (!userId) {
    return res.status(400).json({ error: "Informe o userId" });
  }

  const cart = await CartService.createCartForUser(userId);
  userController.adicionarCarrinhoAoUsuario(userId, cart.id);

  return res.status(201).json({
    message: "Carrinho criado com sucesso!",
    carrinho: cart
  });
};

exports.addProduto = async (req, res) => {
  const { userId, produtoId, quantidade } = req.body;
  if (!userId || !produtoId) {
    return res.status(400).json({ error: "Informe userId e produtoId" });
  }

  const cart = await CartService.addProduto(userId, produtoId, quantidade || 1);
  res.json(cart);
};

exports.removeProduto = async (req, res) => {
  const { userId, produtoId, quantidade } = req.body;
  if (!userId || !produtoId) {
    return res.status(400).json({ error: "Informe userId e produtoId" });
  }

  const cart = await CartService.removeProduto(userId, produtoId, quantidade || 1);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  res.json(cart);
};

exports.clearCart = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Informe o userId" });
  }

  const cart = await CartService.clearCart(userId);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  res.json(cart);
};

exports.getItems = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const loggedUser = req.session.user?.id;

  if (!loggedUser) return res.status(401).json({ message: "Você precisa estar logado." });
  if (loggedUser !== userId) return res.status(403).json({ message: "Acesso negado." });

  const items = await CartService.getItems(userId);
  res.json(items);
};
