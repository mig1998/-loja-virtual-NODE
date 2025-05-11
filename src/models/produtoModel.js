class Produto {
  constructor(id, name, description, price, categoria) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoria = categoria;
  }
}

// Simulando um banco de dados na memória
let produtos = [
  { id: 1, name: "PC", description: "PC de ultima geracao", price: "1234 R$", categoria: "Tecnologia" },
  { id: 2, name: "panela", description: "joao@teste.com", price: "abcd", categoria: "cozinha" }
];

class ProdutoModel {

  static findAll() {
    return produtos;
  }

  static findById(id) {
    return produtos.find(produto => produto.id === id);
  }

  static create(name, description, price, categoria) {
    const newProduto = new Produto(produtos.length + 1, name, description, price, categoria);
    produtos.push(newProduto);
    return newProduto;
  }

  static update(id, name, description, price,categoria) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return null;

    produto.name = name || produto.name;
    produto.description = description || produto.description;
    produto.price = price || produto.price;
    produto.categoria = categoria || produto.categoria;

    return produto;
  }

  static delete(id) {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return false;

    produtos.splice(index, 1);
    return true;
  }
}

module.exports = ProdutoModel;
