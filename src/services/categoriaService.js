const CategoriaModel = require('../models/categoriaModel');

exports.getAllCategorias = async () => {
  return await CategoriaModel.findAll();
};

exports.createCategoria = async (nome) => {
  return await CategoriaModel.create(nome);
};