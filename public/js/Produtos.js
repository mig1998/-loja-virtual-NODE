// Função para listar produtos
async function listProdutos() {
  const response = await fetch("products");
  const resposta = await response.json();

 //console.log(resposta)
  const div = document.getElementById("produtos-list");
 
if (resposta.produtos) {

  div.innerHTML = resposta.produtos.map(p =>
    `<div data-id="${p.id}">
       <strong>${p.name}</strong> – ${p.description}

  ${resposta.userType === 'admin' ? `
      <button onclick="editProduto(${p.id})">✏️</button>
      <button onclick="deleteProduto(${p.id})">🗑️</button>
    ` : ''}
    
         <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho 🛒</button>

     </div>`).join("");

}else{
  div.innerHTML = resposta.map(p =>
    `<div data-id="${p.id}">
       <strong>${p.name}</strong> – ${p.description}

  ${resposta.userType === 'admin' ? `
      <button onclick="editProduto(${p.id})">✏️</button>
      <button onclick="deleteProduto(${p.id})">🗑️</button>
    ` : ''}
    
         <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho 🛒</button>

     </div>`).join("");

}

 

}






async function adicionarAoCarrinho(produtoId) {
  const response = await fetch('/carrinho/adicionar', {  // ajuste a rota conforme seu backend
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ produtoId })  // enviar o id do produto para o backend
  });

  if (response.ok) {
    alert('Produto adicionado ao carrinho!');
  } else {
    alert('Erro ao adicionar produto ao carrinho.');
  }
}


// Inicializa a lista de usuários ao carregar a página
window.onload = listProdutos;






// ---------- UPDATE ----------
function editProduto(id) {             // abre prompt simples
  fetch(`${"/products"}/${id}`)
    .then(r => r.json())
    .then(u => {
      const name = prompt("Novo nome:", u.name);
      const description = prompt("Nova descriçao:", u.description);
      const price = prompt("Novo preco:", u.price);
      const categoria = prompt("Nova categoria:", u.categoria);
      if (name && price) updateProduto(id, { name, description, price, categoria });
    });
}


async function updateProduto(id, data) {
  await fetch(`${"/products"}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
window.location.reload();
}




// ---------- DELETE ----------
async function deleteProduto(id) {
  if (!confirm("Deseja excluir?")) return;
  await fetch(`${"/products"}/${id}`, { method: "DELETE" });
window.location.reload();
}





async function buscarPorId() {
  const id = document.getElementById('search-id').value;
  if (!id) {
    alert('Digite um ID válido');
    return;
  }

  const produto= await getProdutoById(id);
  const div = document.getElementById('result-id');
  if (produto) {
    div.innerHTML = `<p><strong>ID:</strong> ${produto.id} <br> <strong>Nome:</strong> ${produto.name} <br> <strong>descrição:</strong> ${produto.description}</p>`;
  } else {
    div.innerHTML = `<p>Nenhum produto encontrado com ID ${id}</p>`;
  }
}

// Função para buscar por nome e mostrar resultados
async function buscarPorNome() {
  const nome = document.getElementById('search-name').value.trim();
  if (!nome) {
    alert('Digite um nome para buscar');
    return;
  }
  const produtos = await getProdutosByName(nome);
  const div = document.getElementById('result-name');
  if (produtos.length === 0) {
    div.innerHTML = `<p>Nenhum Produto encontrado com nome "${nome}"</p>`;
  } else {
    div.innerHTML = produtos.map(u =>
      `<div>
            <strong>ID:</strong> ${u.id} <br>
            <strong>Nome:</strong> ${u.name} <br>
            <strong>descricao:</strong> ${u.description}
          </div><hr>`
    ).join('');
  }
}

// Suas funções originais para buscar dados via fetch:
async function getProdutoById(id) {
  const res = await fetch(`/products/${id}`);
  return res.ok ? res.json() : null;
}

async function getProdutosByName(name) {
  const res = await fetch(`/products/name/${encodeURIComponent(name)}`);
  return res.ok ? res.json() : [];
}