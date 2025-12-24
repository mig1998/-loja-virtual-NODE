const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }
});

const CategoriaModel = mongoose.model("Categoria", categoriaSchema);

class Categoria {
  static async findAll() {
    return await CategoriaModel.find().sort({ nome: 1 });
  }

  static async create(nome) {
    return await CategoriaModel.create({ nome });
  }
}

module.exports = Categoria;