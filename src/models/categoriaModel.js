const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const CategoriaModel = mongoose.model("Categoria", categoriaSchema);

class Categoria {
  static async findAll() {
    // corrigido: name em vez de nome
    return await CategoriaModel.find().sort({ name: 1 });
  }

  static async create(name) {
    return await CategoriaModel.create({ name });
  }

  static async update(id, data) {
    return await CategoriaModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id) {
    return await CategoriaModel.findByIdAndDelete(id);
  }
}

module.exports = Categoria;