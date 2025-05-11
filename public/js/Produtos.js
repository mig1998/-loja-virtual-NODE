// Função para listar usuários
async function listProdutos() {
  const response = await fetch("products");
  const produtos = await response.json();

  const produtosListDiv = document.getElementById('produtos-list');
  produtosListDiv.innerHTML = produtos.map(produto =>
    `<div><strong>${produto.name}</strong> - ${produto.description} - ${produto.price} - ${produto.categoria}</div>`
  ).join('');
}

// Função para criar usuário
async function createProduto(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const categoria = document.getElementById('categoria').value;


  const data = { name, description, price, categoria };

  const response = await fetch("/products", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const newProduto = await response.json();
  console.log(newProduto.name);
  alert(`produto ${newProduto.name} criado com sucesso!`);
  listProdutos();  // Atualiza a lista de usuários


}

// Adiciona o evento do formulário
document.getElementById('create-produto-form').addEventListener('submit', createProduto);

// Inicializa a lista de usuários ao carregar a página
window.onload = listProdutos;




