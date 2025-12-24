const ProdutoModel = require('../models/produtoModel');

exports.getAllProdutos = async () => {
    return await ProdutoModel.findAll();
};

exports.createProduto = async (name, description, image, price, quantidade, categoria, userId) => {
    return await ProdutoModel.create(name, description, image, price, quantidade, categoria, userId);
};

exports.getProdutoById = async (id) => {
    return await ProdutoModel.findById(id);
};

exports.getProdutoByName = async (name) => {

  // Garantir que seja string
  const termo = String(name || '').trim();
  if (!termo) return [];

  // Busca parcial (case-insensitive) usando o método do model
  return await ProdutoModel.findByName(termo);

};

exports.getProdutoByCategoria = async (categoria) => {

  // Garantir que seja string
  const termo = String(categoria || '').trim();
  if (!termo) return [];

  // Busca parcial (case-insensitive) usando o método do model
  return await ProdutoModel.findByCategoria(termo);

};



exports.getProdutosDoUsuario = async (userId) => {
    return await ProdutoModel.findAllByUserId(userId);
};

exports.updateProduto = async (id, name, description, image, price, quantidade, categoria) => {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (price !== undefined) updateData.price = price;
    if (quantidade !== undefined) updateData.quantidade = quantidade;
    if (categoria !== undefined) updateData.categoria = categoria;

    return await ProdutoModel.update(id, updateData);

};

exports.deleteProduto = async (id) => {
    return await ProdutoModel.delete(id);
};
