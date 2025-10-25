const mongoose = require("mongoose");
const ProdutoModel = require("../models/produtoModel");

const CarrinhoModel = require("../models/cartModel");

// --- Schema do usuário ---

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  type: { type: String, default: "user" }, // "user" ou "admin"
  produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produto" }],
  carrinho: { type: mongoose.Schema.Types.ObjectId, ref: "Carrinho", default: null }
});

const UserModel = mongoose.model("User", userSchema);

// --- Classe que simula o "model antigo" mas usando banco ---
class User {
  static async findAll() {
    return await UserModel.find();
  }

  static async findById(id) {
    return await UserModel.findById(id);
  }

  static async findByName(name) {
    if (!name || typeof name !== "string" || !name.trim()) return [];

    const termo = name.trim();
    return await UserModel.find({
      name: { $regex: termo, $options: "i" }
    });
  }



  static async getProdutosCompletosByUserId(userId) {
    const user = await UserModel.findById(userId).populate("produtos");
    if (!user) return [];
    return user.produtos;
  }


  static async create(name, email, senha, type = "user") {
    const user = new UserModel({ name, email, senha, type, produtos: [] });
    return await user.save();
  }



  // userModel.js
  static async update(id, updateData) {
    // updateData = { name, email, senha, type }
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async delete(id) {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }

  static async getCarrinhoByUserId(userId) {
    const user = await UserModel.findById(userId);
    return user ? user.carrinho : null;
  }

  static async setCarrinho(userId, carrinhoId) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { carrinho: carrinhoId },
      { new: true }
    );
  }


  static async findByEmailAndSenha(email, senha) {
    if (!email || !senha) return null;
    return await UserModel.findOne({ email, senha });
  }




  static async removeProdutoFromUsers(produtoId) {
    if (!produtoId) return;

    const mongoose = require("mongoose");
    const produtoObjectId = mongoose.Types.ObjectId.isValid(produtoId)
      ? new mongoose.Types.ObjectId(produtoId)
      : produtoId;

    await UserModel.updateMany(
      { produtos: produtoObjectId },
      { $pull: { produtos: produtoObjectId } }
    );


        await CarrinhoModel.removeProdutoFromCart(produtoId);
  }


  static async deleteAll(userId) {
    if (!userId) throw new Error("É necessário informar o ID do usuário.");

    // 1️⃣ Buscar o usuário
    const user = await UserModel.findById(userId);
    if (!user) return false;

    // 2️⃣ Deletar produtos do usuário
    if (user.produtos && user.produtos.length > 0) {
      for (const produtoId of user.produtos) {
        // Deletar produto
        await ProdutoModel.delete(produtoId);

        // Remover referência do produto de outros usuários
        await UserModel.updateMany(
          { produtos: produtoId },
          { $pull: { produtos: produtoId } }
        );
      }
    }

    // 3️⃣ Deletar o carrinho do usuário
    if (user.carrinho) {
      await CarrinhoModel.delete(user.carrinho);

      // Remover referência de carrinho de outros usuários
      await UserModel.updateMany(
        { carrinho: user.carrinho },
        { $set: { carrinho: null } }
      );
    }

    // 4️⃣ Deletar o usuário
    await UserModel.findByIdAndDelete(userId);

    return true;
  }



}






module.exports = User;
