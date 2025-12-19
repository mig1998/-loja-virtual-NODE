const params = new URLSearchParams(window.location.search);

const nome = params.get("nome");

async function carregarBusca() {
  if (!nome) return;

  const res = await fetch(`/products/name/${encodeURIComponent(nome)}`);
  const produtos = await res.json();

  const div = document.getElementById("result-name");

  if (!produtos.length) {
    div.innerHTML = `<p>Nenhum produto encontrado para "${nome}"</p>`;
    return;
  }

  div.innerHTML = produtos.map(p => `
    <div>
      <img src="${p.image}" class="foto-produto">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>R$ ${p.price}</strong>
      
      
      
    </div>
  `).join("");
}

carregarBusca();