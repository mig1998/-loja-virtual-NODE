const mongoose = require("mongoose");

// --- Schema do produto ---
const produtoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image:{type:String},
  price: { type: String },
  quantidade: { type: String },
  categoria: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // relaciona com usuário
});

// --- Model do produto ---
const ProdutoModel = mongoose.model("Produto", produtoSchema, "products");

// --- Classe que simula o "model antigo" mas usando MongoDB ---
class Produto {
  static async findAll() {
    return await ProdutoModel.find();
  }

  static async findById(id) {
    return await ProdutoModel.findById(id);
  }

  static async findByName(name) {
    if (!name || typeof name !== "string" || !name.trim()) return [];
    const termo = name.trim();
    return await ProdutoModel.find({
      name: { $regex: termo, $options: "i" } // case-insensitive
    });
  }

  static async findAllByUserId(userId) {
    return await ProdutoModel.find({ userId });
  }

  static async create(name, description, image, price, quantidade, categoria, userId) {
    const produto = new ProdutoModel({ name, description,image, price, quantidade, categoria, userId });
    return await produto.save();
  }

  static async update(id, updateData) {
    // updateData = { name, email, senha, type }
    return await ProdutoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async delete(id) {
    const result = await ProdutoModel.findByIdAndDelete(id);
    if (!result) return false;

    const User = require('./userModel'); // importa sua classe User
    await User.removeProdutoFromUsers(id); // chama o método que criamos

    return true;
  }


}

module.exports = Produto;
