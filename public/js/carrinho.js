async function carregarCarrinho() {
  const res = await fetch("/cart/cart");
  if (!res.ok) {
    document.getElementById("carrinho-list").innerHTML = "<p>Faça login para ver o carrinho.</p>";
    return;
  }
  
  const data = await res.json(); 

//  console.log(data[0].userId);
  // 🔥 se data é um array, pega o carrinho do primeiro usuário (ou do logado)
  const carrinho = Array.isArray(data) ? data[0] : data;

  if (!carrinho || !carrinho.items || carrinho.items.length === 0) {
    document.getElementById("carrinho-list").innerHTML = "<p>Carrinho vazio.</p>";
    return;
  }

  // Aqui você só tem produtoId e quantidade.
  // Para mostrar nome/preço, precisa buscar os produtos
  // Exemplo: fazer fetch de cada produto pelo ID
  const produtosDetalhados = await Promise.all(
    carrinho.items.map(async item => {
      const res = await fetch(`/products/${item.produtoId}`);
      const produto = await res.json();
      return { ...produto, quantidade: item.quantidade };
    })
  );

  const div = document.getElementById("carrinho-list");
  div.innerHTML = produtosDetalhados.map(p => `
    <div>
<strong>${data[0].userId}</strong>
      <strong>${p.name}</strong> – R$ ${p.price} (x${p.quantidade})
      <button onclick="removerDoCarrinho(${data[0].userId},${p.id})">🗑</button>
    </div>
  `).join("");
}

async function removerDoCarrinho(userId,produtoId) {
  await fetch("/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId,produtoId })
  });
  carregarCarrinho();
}

window.onload = carregarCarrinho;
