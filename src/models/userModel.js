
const ProdutoModel = require('./produtoModel');


class User {
  constructor(id, name, email, senha, type, carrinho) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.senha = senha;
    this.type = type;
    this.produtos = [];          // ← IDs dos produtos do usuário
    this.carrinho = [];
  }
}

// Simulando um banco de dados na memória
let users = [
  { id: 1, name: "miguel", email: "miguel@miguel.com", senha: "1234", type: "admin", produtos: [1] },
  { id: 2, name: "joarolao", email: "rola@rola.com", senha: "1234", type: "user" }
];

class UserModel {

  static findAll() {
    return users;
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }


  static findByName(name) {
    const termo = String(name).toLowerCase(); // converte qualquer valor para string

    // Se termo convertido ficar vazio, devolve lista vazia
    if (!termo.trim()) return [];

    return users.filter(user =>
      user.name.toLowerCase().includes(termo)
    );
  }


  static getProdutosCompletosByUserId(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || !user.produtos) return [];

    return user.produtos.map(produtoId => ProdutoModel.findById(produtoId));
  }
  


  static getProdutosCarrinho(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || !user.carrinho) return [];

    return user.carrinho.map(carrinhoId => carrinhoModel.findById(carrinhoId));
  }


  static create(name, email, senha, type = "user") {

    const maxId = produtos.length > 0
      ? Math.max(...produtos.map(p => p.id))
      : 0;

    const newUser = new User(maxId + 1, name, email, senha, type);
    users.push(newUser);
    return newUser;
  }


  static update(id, name, email, senha, type) {
    const user = users.find(u => u.id === id);
    if (!user) return null;

    user.name = name || user.name;
    user.email = email || user.email;
    user.senha = senha || user.senha;
    user.type = type || user.type;

    return user;
  }

  static delete(id) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;

    users.splice(index, id);
    return true;
  }
}

module.exports = UserModel;
