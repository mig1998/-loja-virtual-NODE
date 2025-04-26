const userService = require('../services/userService');

// Controller para buscar todos os usuários
exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.status(200).json(users);
};

// Controller para criar um novo usuário
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
  }

  const newUser = userService.createUser(name, email);
  res.status(201).json(newUser);
};

// (Opcional) Controller para buscar usuário por ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.status(200).json(user);
};

// (Opcional) Controller para atualizar usuário
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updatedUser = userService.updateUser(parseInt(id), name, email);

  if (!updatedUser) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.status(200).json(updatedUser);
};

// (Opcional) Controller para deletar usuário
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const success = userService.deleteUser(parseInt(id));

  if (!success) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.status(204).send(); // 204: No Content
};
