class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// Simulando um banco de dados na memória
let users = [];

class UserModel {
  
  static findAll() {
    return users;
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static create(name, email) {
    const newUser = new User(users.length + 1, name, email);
    users.push(newUser);
    return newUser;
  }

  static update(id, name, email) {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    
    user.name = name || user.name;
    user.email = email || user.email;
    
    return user;
  }

  static delete(id) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }
}

module.exports = UserModel;
