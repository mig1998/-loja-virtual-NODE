const mongoose = require("mongoose");

// --- Schema do Carrinho ---
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
      quantidade: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

// --- Model do Carrinho ---
const CartModel = mongoose.model("Cart", cartSchema);

// --- Classe com métodos similares ao antigo "CartModel" ---
class CartService {
  // Encontra todos os carrinhos
  static async findAll() {
    return await CartModel.find();
  }

  // Encontra o carrinho do usuário
  static async findByUserId(userId) {
    return await CartModel.findOne({ userId });
  }

  // Cria um carrinho novo para o usuário, se não existir
  static async createCartForUser(userId) {
    let cart = await this.findByUserId(userId);
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
      await cart.save();
    }
    return cart;
  }

  // Adiciona produto no carrinho do usuário
  static async addProduto(userId, produtoId, quantidade = 1) {
    const cart = await this.createCartForUser(userId);

    const item = cart.items.find(i => i.produtoId.toString() === produtoId.toString());
    if (item) {
      item.quantidade += quantidade;
    } else {
      cart.items.push({ produtoId, quantidade });
    }

    await cart.save();
    return cart;
  }

  // Remove produto do carrinho (ou diminui quantidade)
  static async removeProduto(userId, produtoId, quantidade = 1) {
    const cart = await this.findByUserId(userId);
    if (!cart) return null;

    const itemIndex = cart.items.findIndex(i => i.produtoId.toString() === produtoId.toString());
    if (itemIndex === -1) return cart;

    if (cart.items[itemIndex].quantidade > quantidade) {
      cart.items[itemIndex].quantidade -= quantidade;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    return cart;
  }

  // Limpar o carrinho do usuário
  static async clearCart(userId) {
    const cart = await this.findByUserId(userId);
    if (!cart) return null;

    cart.items = [];
    await cart.save();
    return cart;
  }

  // Listar produtos (só IDs e quantidades) do carrinho
  static async getItems(userId) {
    const cart = await this.findByUserId(userId);
    if (!cart) return [];
    return cart.items;
  }
}

module.exports = CartService;
