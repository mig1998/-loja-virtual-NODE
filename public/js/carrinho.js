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

//  console.log(produtosDetalhados);

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
        <button onclick="limparCarrinho()">Limpar Carrinho</button>
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

async function pagar(total) {
  const confirmacao = await Swal.fire({
    title: "Confirmar pagamento?",
    text: `Total: R$ ${total.toFixed(2)}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Pagar",
    cancelButtonText: "Cancelar"
  });

  if (!confirmacao.isConfirmed) return;

  Swal.fire({
    title: "Processando pagamento...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    // checkout fictício
    const res = await fetch("carts/checkout/fake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total })
    });

    if (!res.ok) throw new Error("Erro no pagamento");

    const pedido = await res.json();

    Swal.fire({
  title: "Pagamento aprovado ✅",
  text: `Pedido #${pedido.orderId} criado com sucesso`,
  icon: "success",
  confirmButtonText: "OK"
}).then(async () => {
  await limparCarrinho();
});
    

  } catch (err) {
    Swal.fire("Erro", "Falha no pagamento", "error");
  }
}

window.onload = carregarCarrinho;




async function limparCarrinho() {
  const res = await fetch("/carts/clear", {
    method: "POST"
  });
 console.log(res)
  if (res.ok) {
    Swal.fire("Carrinho limpo!", "", "success");
    carregarCarrinho();
  } else {
    Swal.fire("Erro", "Não foi possível limpar o carrinho", "error");
  }
}