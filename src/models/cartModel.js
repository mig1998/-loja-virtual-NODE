const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const produtoModel = require("../models/produtoModel");


// --- Schema do Carrinho ---
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      produtoId: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
      quantidade: { type: Number, default: 1 },
    },
  ],
});

// --- Model do Carrinho ---
const CartModel = mongoose.model("Cart", cartSchema);

// --- Classe com métodos similares ao antigo "CartModel" ---
class Cart {
  // Encontra todos os carrinhos
  static async findAll() {
    return await CartModel.find();
  }

  // Encontra o carrinho do usuário
  static async findByUserId(userId) {
    return await CartModel.findOne({ userId });
  }

  // Cria um carrinho novo para o usuário, se não existir
  // Cria carrinho para usuário, se não existir
  static async createCartForUser(userId) {
    let cart = await this.findByUserId(userId);
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
      await cart.save();

      // Atualiza o usuário com o id do carrinho

    }
    return cart;
  }



  // Adiciona produto no carrinho do usuário
  static async addProduto(userId, produtoId, quantidade = 1) {
  const cart = await this.createCartForUser(userId);

  // 🔥 GARANTE QUE É NÚMERO
  quantidade = Number(quantidade);
  
 // 1️⃣ busca produto
  const produto = await produtoModel.findById(produtoId);
  if (!produto) throw new Error("Produto não encontrado");

  // 2️⃣ verifica estoque
  if (produto.quantidade < quantidade) {
    throw new Error("Estoque insuficiente");
  }


  const item = cart.items.find(
    i => i.produtoId.toString() === produtoId.toString()
  );

  if (item) {
    item.quantidade = Number(item.quantidade) + quantidade;
  } else {
    cart.items.push({ produtoId, quantidade });
  }


// 5️⃣ REMOVE DO ESTOQUE
  produto.quantidade -= quantidade;

  // 6️⃣ salva tudo
  await produto.save();
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



  // 🧹 Novo método: deletar o carrinho completamente
  static async delete(id) {
    const result = await CartModel.findByIdAndDelete(id);
    if (!result) return false;

  }



  static async removeProdutoFromCart(produtoId) {
    if (!produtoId) return;

    const mongoose = require("mongoose");
    const produtoObjectId = mongoose.Types.ObjectId.isValid(produtoId)
      ? new mongoose.Types.ObjectId(produtoId)
      : produtoId;

    await CartModel.updateMany(
      { "items.produtoId": produtoObjectId },
      { $pull: { items: { produtoId: produtoObjectId } } }
    );
  }


}

module.exports = Cart;
