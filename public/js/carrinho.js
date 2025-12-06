async function carregarCarrinho() {
  const res = await fetch("/carts/cart");
  if (!res.ok) {
    document.getElementById("carrinho-list").innerHTML = "<p>Faça login para ver o carrinho.</p>";
    return;
  }

  const data = await res.json();

  const carrinho = Array.isArray(data) ? data[0] : data;

  if (!carrinho || !carrinho.items || carrinho.items.length === 0) {
    document.getElementById("carrinho-list").innerHTML = "<p>Carrinho vazio.</p>";
    return;
  }

  const produtosDetalhados = await Promise.all(
    carrinho.items.map(async item => {
      const res = await fetch(`/products/${item.produtoId}`);  // ← agora está certo
      const produto = await res.json();
      return { ...produto, quantidade: item.quantidade };
    })
  );

  console.log(produtosDetalhados);

  const total = produtosDetalhados.reduce((acc, p) => acc + (p.price * p.quantidade), 0);

  const div = document.getElementById("carrinho-list");

  div.innerHTML = produtosDetalhados.map(p => `
    <div>
      <img src="${p.image}" class="foto-produto">
      <h2>${p.name}</h2>
      <h3>R$: ${p.price}</h3>
      <h3>Quantidade: x${p.quantidade}</h3>
      <button onclick="removerDoCarrinho('${carrinho.userId}', '${p._id}')">🗑</button>
    </div>
    <hr>
  `).join("");

  div.innerHTML += `
    <div>
      <h2>Total: R$ ${total.toFixed(2)}</h2>
      <button onclick="pagar(${total})">Pagar</button>
    </div>
  `;
}

async function removerDoCarrinho(userId, produtoId) {
  await fetch("/carts/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, produtoId })
  });

  carregarCarrinho();
}

function pagar(total) {
  alert("Pagamento ainda não implementado. Total: R$ " + total.toFixed(2));
}

window.onload = carregarCarrinho;