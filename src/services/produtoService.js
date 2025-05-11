const ProdutoModel = require('../models/produtoModel');


exports.getAllProdutos = () => {
    return ProdutoModel.findAll();
};

exports.createProduto = (name, description, price, categoria) => {
    return ProdutoModel.create(name, description, price, categoria);
};

exports.getProdutoById = (id) => {
    return ProdutoModel.findById(id);
};

exports.updateProduto = (id, name,description, price, categoria) => {
    return ProdutoModel.update(id, name,description, price, categoria);
};

exports.deleteProduto = (id) => {
    return ProdutoModel.delete(id);
};



