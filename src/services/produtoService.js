const ProdutoModel = require('../models/produtoModel');


exports.getAllProdutos = () => {
    return ProdutoModel.findAll();
};

exports.createProduto = (name, description, price, categoria,userId) => {
    return ProdutoModel.create(name, description, price, categoria,userId);
};

exports.getProdutoById = (id) => {
    return ProdutoModel.findById(id);
};


exports.getProdutoByName = (name) => {
    return ProdutoModel.findByName(name);
};


exports.updateProduto = (id, name,description, price, categoria) => {
    return ProdutoModel.update(id, name,description, price, categoria);
};

exports.deleteProduto = (id) => {
    return ProdutoModel.delete(id);
};

