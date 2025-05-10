const UserModel = require('../models/userModel');

exports.getAllUsers = () => {
  return UserModel.findAll();
};

exports.createUser = (name, email) => {
  return UserModel.create(name, email);
};

exports.getUserById = (id) => {
  return UserModel.findById(id);
};

exports.updateUser = (id, name, email) => {
  return UserModel.update(id, name, email);
};

exports.deleteUser = (id) => {
  return UserModel.delete(id);
};
