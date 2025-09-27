const UserModel = require('../models/userModel');

// Buscar todos os usuários
exports.getAllUsers = async () => {
  return await UserModel.findAll(); // Mongoose retorna array de usuários
};

exports.createUser = async (name, email, senha, type = 'user') => {
  // Usa o método estático da classe que já faz new + save
  return await UserModel.create(name, email, senha, type);
};

// Buscar usuário por ID
exports.getUserById = async (id) => {
  return await UserModel.findById(id); // procura pelo _id
};

// Buscar usuários por nome
exports.getUserByName = async (name) => {
  // Garantir que seja string
  const termo = String(name || '').trim();
  if (!termo) return [];

  // Busca parcial (case-insensitive) usando o método do model
  return await UserModel.findByName(termo);
};
// Atualizar usuário
exports.updateUser = async (id, name, email, senha, type) => {
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (senha !== undefined) updateData.senha = senha;
  if (type !== undefined) updateData.type = type;

  return await UserModel.update(id, updateData);
};

// Deletar usuário
exports.deleteUser = async (id) => {
  const result = await UserModel.delete(id);
  return result !== null; // retorna true se conseguiu deletar
};

// Adicionar produto ao usuário
exports.adicionarProdutoAoUsuario = async (userId, produtoId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("Usuário não encontrado");

  user.produtos.push(produtoId);
  return await user.save();
};

// Adicionar carrinho ao usuário
exports.adicionarCarrinhoAoUsuario = async (userId, carrinhoId) => {
  const user = await UserModel.findById(userId);
  if (!user) return false;

  if (user.carrinho) return false; // já tem carrinho

  user.carrinho = carrinhoId;
  await user.save();
  return true;
};
