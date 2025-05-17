const produtoService = require('../services/produtoService');



// Controller para buscar todos os usuários
exports.getAllProdutos = (req, res) => {
    const produtos = produtoService.getAllProdutos();
    res.status(200).json(produtos);
};

// Controller para criar um novo usuário
exports.createProduto = (req, res) => {
    const { name, description, price, categoria } = req.body;



    if (!name || !price) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    const newProduto = produtoService.createProduto(name, description, price, categoria);
    res.status(201).json(newProduto);
};



// (Opcional) Controller para buscar produto por ID
exports.getProdutoById = (req, res) => {
    const { id } = req.params;
    const produto = produtoService.getProdutoById(parseInt(id));

    if (!produto) {
        return res.status(404).json({ message: 'produto não encontrado.' });
    }

    res.status(200).json(produto);
};


// (Opcional) Controller para buscar usuário por nome
exports.getProdutoByName = (req, res) => {

    const name = String(req.params.name || '').trim();

    if (!name) {
        return res.status(400).json({ message: 'Nome é obrigatório.' });
    }

    const produtos = produtoService.getProdutoByName(name);


    if (!produtos) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(produtos);
};




// (Opcional) Controller para atualizar produto
exports.updateProduto = (req, res) => {
    const { id } = req.params;
    const { name, description, price, categoria } = req.body;

    // if (type === 'admin' && req.Produto.type !== 'admin') {  // Verifica se o usuário é admin
    //   return res.status(403).json({ message: 'Você não tem permissão para criar administradores.' });
    // }

    const updatedProduto = produtoService.updateProduto(parseInt(id), name, description, price, categoria);

    if (!updatedProduto) {
        return res.status(404).json({ message: 'produto não encontrado.' });
    }

    res.status(200).json(updatedProduto);
};

// (Opcional) Controller para deletar produto
exports.deleteProduto = (req, res) => {

    // if (type === 'admin' && req.Produto.type !== 'admin') {  // Verifica se o usuário é admin
    //   return res.status(403).json({ message: 'Você não tem permissão para criar administradores.' });
    // }

    const { id } = req.params;

    const success = produtoService.deleteProduto(parseInt(id));

    if (!success) {
        return res.status(404).json({ message: 'produto não encontrado.' });
    }

    res.status(204).send(); // 204: No Content
};
