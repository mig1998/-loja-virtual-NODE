const categoriaModel = require('../models/categoriaModel');

exports.getAllCategorias = async () => {
  return await categoriaModel.findAll();
};

exports.createCategoria = async (name) => {
  return await categoriaModel.create(name);
};


exports.updateCategoria = async (id, name) => {
  const updateData = {};

  if (name !== undefined) updateData.name = name;

  return await categoriaModel.update(id, updateData);
};


exports.deleteCategoria = async (id) => {
  return await categoriaModel.delete(id);
};