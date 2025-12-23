/*


// Função para listar produtos
async function listProdutos() {
  const response = await fetch("products");
  const resposta = await response.json();

  //console.log(resposta)
  const div = document.getElementById("produtos-list");


  //logado
  if (resposta.produtos) {

    div.innerHTML = resposta.produtos.map(p =>
      `<div data-id="${p.id}"> 
         <img src="${p.image}" class="foto-produto">  
       <h2>${p.name}</h2>  <h3>Descrição:</h3> <p>${p.description}</p>
        <h3>R$:${p.price}</h3>

  ${resposta.userType === 'admin' ? `
   <a style="background-color: #f39c12;border: none;padding: 10px 16px;border-radius: 8px; cursor: pointer;font-weight: bold;margin: 8px 4px 0 0;transition: transform 0.2s ease, background-color 0.3s ease;"           href="/editProduto?id=${p._id}"<button>✏️</button></a>
      <button onclick="deleteProduto('${p._id}')">🗑️</button>
    ` : ''}
       <h3>R$:estoque: ${p.quantidade}</h3>
  <input
    type="number"
    id="qtd-${p._id}"
    value="1"
    min="1"
    max="${p.quantidade}"
    class="input-qtd"
    oninput="limitarQuantidade(this)"
    ${p.quantidade === 0 ? "disabled" : ""}
  >

  ${
    p.quantidade > 0
      ? `<button onclick="adicionarAoCarrinho('${resposta.userId}','${p._id}')">
           Adicionar ao carrinho 🛒
         </button>`
      : `<button disabled style="
           background:#ccc;
           cursor:not-allowed;
           opacity:0.7;
         ">
           Esgotado ❌
         </button>`
  }

     </div>`).join("");


    //não logado
  } else {
    div.innerHTML = resposta.map(p =>
      `<div data-id="${p.id}">
 <img src="${p.image}" class="foto-produto">  
    <h2>${p.name}</h2>  <h3>Descrição:</h3> <p>${p.description}</p>
        <h3>R$:${p.price}</h3>

         <h3>:estoque: ${p.quantidade}</h3>
         
  <input
    type="number"
    id="qtd-${p._id}"
    value="1"
    min="1"
    max="${p.quantidade}"
    class="input-qtd"
    oninput="limitarQuantidade(this)"
    ${p.quantidade === 0 ? "disabled" : ""}
  >

  ${
    p.quantidade > 0
      ? `<button onclick="adicionarAoCarrinho('${resposta.userId}','${p._id}')">
           Adicionar ao carrinho 🛒
         </button>`
      : `<button disabled style="
           background:#ccc;
           cursor:not-allowed;
           opacity:0.7;
         ">
           Esgotado ❌
         </button>`
  }
     </div>`).join("");

  }
}

// Inicializa a lista de usuários ao carregar a página
window.onload = listProdutos;

*/




async function listProdutos() {
  const res = await fetch("/products");
  const data = await res.json();

  if (data.produtos) {
    renderProdutos(data.produtos, {
      userId: data.userId,
      userType: data.userType
    });
  } else {
    renderProdutos(data, {});
  }
}



window.onload = listProdutos;


/*

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

*/






async function buscarPorId() {
  const id = document.getElementById('search-id').value;


  const produto = await getProdutoById(id);

  console.log(produto)

  const div = document.getElementById('result-id');
  if (produto) {
    div.innerHTML = `<p><strong>ID:</strong> 
    ${produto._id} <br> 
         <img src="${produto.image}" class="foto-produto"><br>
  <strong>Nome:</strong> ${produto.name} <br> <strong>descrição:</strong> ${produto.description}</p>`;
  } else {
    div.innerHTML = `<p>Nenhum produto encontrado com ID ${id}</p>`;
  }
}





// Suas funções originais para buscar dados via fetch:
async function getProdutoById(id) {
  const res = await fetch(`/products/${id}`);
  return res.ok ? res.json() : null;
}



function limitarQuantidade(input) {
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  let valor = parseInt(input.value);

  if (isNaN(valor)) valor = min;

  if (valor < min) input.value = min;
  if (valor > max) input.value = max;
}