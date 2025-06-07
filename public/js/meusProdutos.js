async function listarMeusProdutos() {
  const res = await fetch("/products/user/produtos");

  if (!res.ok) {
    alert("Você precisa estar logado para ver seus produtos.");
    return;
  }

  const produtos = await res.json();
  const div = document.getElementById("meus-produtos");

  if (produtos.length === 0) {
    div.innerHTML = "<p>Você ainda não cadastrou produtos.</p>";
    return;
  }

  div.innerHTML = produtos.map(p => `
    <div>
      <strong>${p.name}</strong><br>
      Descrição: ${p.description}<br>
      Preço: R$ ${p.price}<br>
       <button onclick="editProduto(${p.id})">✏️</button>
       <button onclick="deleteProduto(${p.id})">🗑️</button>
      Categoria: ${p.categoria}<hr>
    </div>
  `).join("");
}

window.onload = listarMeusProdutos;
