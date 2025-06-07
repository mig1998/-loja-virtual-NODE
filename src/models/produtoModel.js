class Produto {
  constructor(id, name, description, price, categoria, userId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoria = categoria;
    this.userId = userId;
  }
}

// Simulando um banco de dados na memória
let produtos = [
  { id: 1, name: "PC", description: "PC de ultima geracao", price: "1234 R$", categoria: "Tecnologia", userId: 1 },
  { id: 2, name: "panela", description: "joao@teste.com", price: "abcd", categoria: "cozinha" }
];



class ProdutoModel {

  static findAll() {
    return produtos;
  }

  static findById(id) {
    return produtos.find(produto => produto.id === id);
  }



  static findByName(name) {
    const termo = String(name).toLowerCase(); // converte qualquer valor para string

    // Se termo convertido ficar vazio, devolve lista vazia
    if (!termo.trim()) return [];

    return produtos.filter(produto =>
      produto.name.toLowerCase().includes(termo)
    );
  }



  static findAllByUserId(userId) {
    return produtos.filter(produto => produto.userId === userId);
  }



  static create(name, description, price, categoria, userId) {

    const maxId = produtos.length > 0
      ? Math.max(...produtos.map(p => p.id))
      : 0;


    const newProduto = new Produto(maxId + 1, name, description, price, categoria, userId);
    produtos.push(newProduto);
    return newProduto;
  }

  static update(id, name, description, price, categoria) {
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

    produtos.splice(index, id);
    return true;
  }
}

module.exports = ProdutoModel;
