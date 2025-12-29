async function carregarCategorias() {
  const res = await fetch("/tag");
  const categorias = await res.json();

  const menu = document.getElementById("menu-categorias");




  menu.innerHTML = categorias.map(c => `
    <button style='background-color:crimson;'  onclick="filtrarCategoria('${c.name}')">
      ${c.name}
    </button>
  `).join("");
}

carregarCategorias();


async function filtrarCategoria(categoria) {
  const res = await fetch(`/products/categoria/${categoria}`);
  const data = await res.json();
const div = document.getElementById("produtos-list") 

  // Normaliza os produtos (logado ou não)
  const produtos = Array.isArray(data.produtos)
    ? data.produtos
    : Array.isArray(data)
      ? data
      : [];

  

  // Renderização
  renderProdutos(produtos, {
    userId: data.userId || null,
    userType: data.userType || null
  });
}




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






async function buscarPorId() {
  const id = document.getElementById('search-id').value;


  const produto = await getProdutoById(id);

  

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