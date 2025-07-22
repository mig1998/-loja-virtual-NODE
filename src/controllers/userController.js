const userService = require('../services/userService');



// Controller para buscar todos os usuários
exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.status(200).json(users);
};

// Controller para criar um novo usuário
exports.createUser = (req, res) => {
  const { name, email, senha, type } = req.body;



  if (!name || !email || !senha) {
    return res.status(400).json({ message: 'Nome e e-mail  e senha são obrigatórios.' });
  }

  const newUser = userService.createUser(name, email, senha, type);
  res.status(201).json(newUser);
};

// (Opcional) Controller para buscar usuário por ID
exports.getUserById = (req, res) => {
  const user = userService.getUserById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  res.status(200).json(user);
};



// (Opcional) Controller para buscar usuário por nome
exports.getUserByName = (req, res) => {

  const name = String(req.params.name || '').trim();

  if (!name) {
    return res.status(400).json({ message: 'Nome é obrigatório.' });
  }

  const users = userService.getUserByName(name);


  if (!users) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.status(200).json(users);
};


// (Opcional) Controller para atualizar usuário
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, senha, type } = req.body;


  // if (type === 'admin' && req.user.type !== 'admin') {  // Verifica se o usuário é admin
  //   return res.status(403).json({ message: 'Você não tem permissão para criar administradores.' });
  // }

  const updatedUser = userService.updateUser(parseInt(id), name, email, senha, type);

  if (!updatedUser) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.status(200).json(updatedUser);
};

// (Opcional) Controller para deletar usuário
exports.deleteUser = (req, res) => {

  // if (type === 'admin' && req.user.type !== 'admin') {  // Verifica se o usuário é admin
  //   return res.status(403).json({ message: 'Você não tem permissão para criar administradores.' });
  // }

  const { id } = req.params;

  const success = userService.deleteUser(parseInt(id));

  if (!success) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.status(204).send(); // 204: No Content
};




exports.adicionarProdutoAoUsuario = (userId, produtoId) => {

  const user = userService.getUserById(userId);

  if (!user) return false;

  if (!user.produtos) user.produtos = [];
  user.produtos.push(produtoId);
  return true;
};



