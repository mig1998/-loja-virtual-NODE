const mongoose = require("mongoose");

// --- Schema do usuário ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  type: { type: String, default: "user" }, // "user" ou "admin"
  produtos: [{ type: String }],            // IDs de produtos
  carrinho: { type: String, default: null } // ID do carrinho
});

// --- Model do usuário ---
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



  static async getProdutosCompletosByUserId(userId, ProdutoModel) {
    const user = await UserModel.findById(userId);
    if (!user || !user.produtos) return [];
    return user.produtos.map(produtoId => ProdutoModel.findById(produtoId));
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

}

module.exports = User;
