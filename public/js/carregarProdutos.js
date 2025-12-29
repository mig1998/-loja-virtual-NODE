function renderProdutos(produtos, contexto = {}) {
  const div = document.getElementById("produtos-list") 
           || document.getElementById("result-name");


// Nenhum produto
  if (produtos.length === 0) {
    div.innerHTML = "<h1 style='text-align:center'>Nenhum produto nessa categoria</h1>";
    return;
  }

  div.innerHTML = produtos.map(p => `
    <div class="produto-card">

      <img src="${p.image}" class="foto-produto">

      <h2>${p.name}</h2>
      <p>${p.description}</p>
      <strong>R$ ${p.price}</strong>

      <p>Estoque: ${p.quantidade}</p>

      <input
        type="number"
        id="qtd-${p._id}"
        value="1"
        min="1"
        max="${p.quantidade}"
        ${p.quantidade === 0 ? "disabled" : ""}
        oninput="limitarQuantidade(this)"
      >

      ${
        p.quantidade > 0
          ? `<button onclick="adicionarAoCarrinho('${contexto.userId}','${p._id}')">
               Adicionar ao carrinho 🛒
             </button>`
          : `<button disabled style="
           background:#ccc;
           cursor:not-allowed;
           opacity:0.7;">Esgotado ❌</button>`
      }

      ${
        contexto.userType === "admin"
          ? `
            <a style="background-color: #f39c12;border: none;padding: 10px 16px;border-radius: 8px; cursor: pointer;font-weight: bold;margin: 8px 4px 0 0;transition: transform 0.2s ease, background-color 0.3s ease;"           href="/editProduto?id=${p._id}"<button>✏️</button></a>
            <button onclick="deleteProduto('${p._id}')">🗑️</button>
          `
          : ""
      }

    </div>
  `).join("");
}




//adicionar ao carrinho
async function adicionarAoCarrinho(userId, produtoId) {

  const quantidade = document.getElementById(`qtd-${produtoId}`).value || 1;

  const response = await fetch("/carts/add", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, produtoId, quantidade })
  });

  if (response.ok) {
    Swal.fire({
      title: "Sucesso!",
      text: `Produto adicionado ao carrinho! Quantidade: ${quantidade}`,
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
            window.location.reload();
        });
  } else {
    Swal.fire({
    title: "Erro",
    text: "Erro ao adicionar ao carrinho, faça login pra adicionar items ao carrinho",
    icon: "error"
  });
  }
}


// ---------- DELETE ----------
async function deleteProduto(id) {
  const result = await Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá desfazer isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não"
  });
  
  
  if (result.isConfirmed) {
  await fetch(`${"/products"}/${id}`, { method: "DELETE" });
  window.location.reload();
  }
}
