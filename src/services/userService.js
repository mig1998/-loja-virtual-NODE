const UserModel = require('../models/userModel');


exports.getAllUsers = () => {
  return UserModel.findAll();
};

exports.createUser = (name, email, senha, type = 'user') => {
  return UserModel.create(name, email, senha, type);
};

exports.getUserById = (id) => {
  return UserModel.findById(id);
};


exports.getUserByName = (name) => {
  return UserModel.findByName(name);
};


exports.updateUser = (id, name, email, senha, type) => {
  return UserModel.update(id, name, email, senha, type);
};

exports.deleteUser = (id) => {
  return UserModel.delete(id);
};



