


class Cart {
  constructor(userId) {
    this.id = nextCartId++; // gera um id automático para o carrinho
    this.userId = userId;
    this.items = []; // array de { produtoId, quantidade }
  }
}

// Simulando banco de dados em memória
const carts = [
  { id: 1, userId: 1, items: [{ produtoId: 1, quantidade: 1 }] }
];

// contador baseado no maior ID atual (evita repetir id)
let nextCartId = carts.length > 0
  ? Math.max(...carts.map(c => c.id)) + 1
  : 1;

  
class CartModel {
  // Encontra todos os carrinhos
  static findAll() {
    return carts;
  }

  // Encontra o carrinho do usuário
  static findByUserId(userId) {
    return carts.find(cart => cart.userId === userId);
  }

  // Cria um carrinho novo para o usuário, se não existir
  static createCartForUser(userId) {
    let cart = this.findByUserId(userId);
    if (!cart) {
      cart = new Cart(userId);
      carts.push(cart);
    }
    return cart;
  }

  // Adiciona produto no carrinho do usuário
  static addProduto(userId, produtoId, quantidade = 1) {
    let cart = this.createCartForUser(userId);

    const item = cart.items.find(i => i.produtoId === produtoId);
    if (item) {
      item.quantidade += quantidade; // soma quantidade
    } else {
      cart.items.push({ produtoId, quantidade });
    }
    return cart;
  }

  // Remove produto do carrinho (ou diminui quantidade)
  static removeProduto(userId, produtoId, quantidade = 1) {
    const cart = this.findByUserId(userId);
    if (!cart) return null;

    const itemIndex = cart.items.findIndex(i => i.produtoId === produtoId);
    if (itemIndex === -1) return cart;

    if (cart.items[itemIndex].quantidade > quantidade) {
      cart.items[itemIndex].quantidade -= quantidade;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    return cart;
  }

  // Limpar o carrinho do usuário
  static clearCart(userId) {
    const cart = this.findByUserId(userId);
    if (!cart) return null;

    cart.items = [];
    return cart;
  }

  // Listar produtos (só IDs e quantidades) do carrinho
  static getItems(userId) {
    const cart = this.findByUserId(userId);
    if (!cart) return [];
    return cart.items;
  }
}

module.exports = CartModel;
