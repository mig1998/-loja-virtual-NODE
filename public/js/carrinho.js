async function carregarCarrinho() {
const res = await fetch("/carts/cart");
if (!res.ok) {
document.getElementById("carrinho-list").innerHTML = "<p>Faça login para ver o carrinho.</p>";
return;
}

const data = await res.json();

//console.log(data[0]);
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
const res = await fetch(/products/${item.produtoId});
const produto = await res.json();
return { ...produto, quantidade: item.quantidade };
})
);

console.log(produtosDetalhados)

const total = produtosDetalhados.reduce((acc, p) => acc + (p.price * p.quantidade), 0);

const div = document.getElementById("carrinho-list");
div.innerHTML = produtosDetalhados.map(p =>   <div>   <h2>${p.name}</h2>  <h2> R$: ${p.price}</h2>  <h2>quantidade: (x${p.quantidade})</h2>   <button onclick="removerDoCarrinho('${data[0].userId}','${p._id}')">🗑</button>   </div>   <hr>  ).join("");

div.innerHTML += `

  <div>  
    <h2>Total: R$ ${total.toFixed(2)}</h2>  
    <button onclick="pagar(${total})">Pagar</button>  
  </div>  
`;  
}  async function removerDoCarrinho(userId,produtoId) {
await fetch("/carts/remove", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ userId,produtoId })
});
carregarCarrinho();
}

//

function pagar(total) {
alert("Pagamento ainda não implementado. Total: R$ " + total.toFixed(2));
}

window.onload = carregarCarrinho;