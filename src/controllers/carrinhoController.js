const CartService = require("../services/carrinhoService");
const userController = require('../controllers/userController');
const UserService = require("../services/userService");


exports.getAllCarts = (req, res) => {

  const carts = CartService.getAllCarrinho();
  res.status(200).json(carts);
};



exports.getCart = (req, res) => {

  const userSession = req.session.user;


  const carts = CartService.getAllCarrinho();

  // Verificação de sessão
  let resultado;

  if (!userSession) {
    // Se não houver usuário logado, pode retornar vazio ou todos (como quiser)
    resultado = [];
  } else {
    // Filtra apenas o carrinho do usuário logado
    resultado = carts.filter(cart => cart.userId === userSession.id);
  }

  res.status(200).json(resultado);

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
  const userId = parseInt(req.params.userId); // ID passado na URL
  const loggedUser = req.session.user.id; // Usuário logado na sessão

  // 🔒 Verifica se o usuário está logado
  if (!loggedUser) {
    return res.status(401).json({ message: "Você precisa estar logado para acessar o carrinho." });
  }

  // 🔒 Verifica se o usuário logado é o dono do carrinho
  if (loggedUser != userId) {
    return res.status(403).json({ message: "Acesso negado. Você só pode ver o seu próprio carrinho." });
  }


  const items = CartService.getItems(userId);
  res.json(items);
}


// exports.getCarrinhoByUser = (req, res) => {
//   const userId = parseInt(req.params.userId); // ID passado na URL
//   const loggedUser = req.session.user.id; // Usuário logado na sessão

//   // 🔒 Verifica se o usuário está logado
//   if (!loggedUser) {
//     return res.status(401).json({ message: "Você precisa estar logado para acessar o carrinho." });
//   }

//   // 🔒 Verifica se o usuário logado é o dono do carrinho
//   if (loggedUser != userId) {
//     return res.status(403).json({ message: "Acesso negado. Você só pode ver o seu próprio carrinho." });
//   }

//   const cart = CartService.findByUserId(userId);

//   if (!cart) {
//     return res.status(404).json({ message: "Carrinho não encontrado." });
//   }

//   res.json(cart);
// };
