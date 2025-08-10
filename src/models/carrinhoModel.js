class carrinho {
  constructor(userId) {
    this.userId = userId;
    this.items = []; // array de { produtoId, quantidade }
  }
}

// Simulando banco de dados em memória
const carrinho = [];

class carrinhoModel {

  // Encontra o carrinho do usuário
  static findByUserId(userId) {
    return carrinho.find(carrinho => carrinho.userId === userId);
  }

  // Cria um carrinho novo para o usuário, se não existir
  static createcarrinhoForUser(userId) {
    let carrinho = this.findByUserId(userId);
    if (!carrinho) {
      carrinho = new carrinho(userId);
      carrinho.push(carrinho);
    }
    return carrinho;
  }

  // Adiciona produto no carrinho do usuário
  static addProduto(userId, produtoId, quantidade = 1) {
    let carrinho = this.createcarrinhoForUser(userId);

    const item = carrinho.items.find(i => i.produtoId === produtoId);
    if (item) {
      item.quantidade += quantidade; // soma quantidade
    } else {
      carrinho.items.push({ produtoId, quantidade });
    }
    return carrinho;
  }

  // Remove produto do carrinho (ou diminui quantidade)
  static removeProduto(userId, produtoId, quantidade = 1) {
    const carrinho = this.findByUserId(userId);
    if (!carrinho) return null;

    const itemIndex = carrinho.items.findIndex(i => i.produtoId === produtoId);
    if (itemIndex === -1) return carrinho;

    if (carrinho.items[itemIndex].quantidade > quantidade) {
      carrinho.items[itemIndex].quantidade -= quantidade;
    } else {
      carrinho.items.splice(itemIndex, 1);
    }

    return carrinho;
  }

  // Limpar o carrinho do usuário
  static clearcarrinho(userId) {
    const carrinho = this.findByUserId(userId);
    if (!carrinho) return null;

    carrinho.items = [];
    return carrinho;
  }

  // Listar produtos (só IDs e quantidades) do carrinho
  static getItems(userId) {
    const carrinho = this.findByUserId(userId);
    if (!carrinho) return [];
    return carrinho.items;
  }
}

module.exports = carrinhoModel;
