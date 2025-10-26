const produtoService = require('../services/produtoService');
const userController = require('../controllers/userController');
const userService = require('../services/userService');
const UserModel = require('../models/userModel');

// Buscar todos os produtos
exports.getAllProdutos = async (req, res) => {
    try {
        const userSession = req.session.user;
        const produtos = await produtoService.getAllProdutos();

        if (!userSession) {
            return res.status(200).json(produtos);
        }

        const user = await userService.getUserById(userSession.id);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

        res.status(200).json({
            userId: userSession.id,
            userType: user.type,
            produtos
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno ao buscar produtos.' });
    }
};





// Criar produto
exports.createProduto = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) return res.status(401).json({ message: "Usuário não autenticado." });

        const { name, description, price, categoria } = req.body;
        if (!name || !price) return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });

        const newProduto = await produtoService.createProduto(name, description, price, categoria, user._id || user.id);

        await userService.adicionarProdutoAoUsuario(user._id || user.id, newProduto._id);

        res.status(201).json(newProduto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno ao criar produto.' });
    }
};

// Buscar produto por ID
exports.getProdutoById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoService.getProdutoById(id); // agora é objeto
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });

        res.status(200).json(produto); // retorna um objeto, não array
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno ao buscar produto.' });
    }
};

// Buscar produto por nome
exports.getProdutoByName = async (req, res) => {
    try {
        const name = String(req.params.name || '').trim();
        if (!name) return res.status(400).json({ message: 'Nome é obrigatório.' });

        const produtos = await produtoService.getProdutoByName(name);
        if (!produtos || produtos.length === 0) return res.status(404).json({ message: 'Produto não encontrado.' });

        res.status(200).json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno ao buscar produto por nome.' });
    }
};

// Buscar produtos do usuário logado
exports.getMeusProdutos = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(401).json({ message: 'Não autenticado' });
        }

        // importa o model de produtos
        const ProdutoModel = require("../models/produtoModel");

        // busca produtos e dados do usuário
        const produtos = await UserModel.getProdutosCompletosByUserId(user._id || user.id, ProdutoModel);
        const userInfo = await userService.getUserById(user._id || user.id);

        res.status(200).json({
            userType: userInfo.type,
            produtos
        });

    } catch (err) {
        console.error("Erro ao buscar produtos do usuário:", err);
        res.status(500).json({
            message: 'Erro interno ao buscar produtos do usuário.',
            error: err.message
        });
    }
};


// Atualizar produto
exports.updateProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoria } = req.body;

        const updatedProduto = await produtoService.updateProduto(id, name, description, price, categoria);
        if (!updatedProduto) return res.status(404).json({ message: 'Produto não encontrado.' });

        res.status(200).json(updatedProduto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno ao atualizar produto.' });
    }
};

// Deletar produto
exports.deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await produtoService.deleteProduto(id);
        if (!success) return res.status(404).json({ message: 'Produto não encontrado.' });

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno ao deletar produto.' });
    }
};
