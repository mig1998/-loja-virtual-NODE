async function carregarCategorias() {
  const res = await fetch("/tag");
  const categorias = await res.json();

  const select = document.getElementById("categoria");

  select.innerHTML = categorias.map(c => `
    <option value="${c.nome}">${c.nome}</option>
  `).join("");
}

carregarCategorias();


async function criarCategoria() {
  const nome = document.getElementById("nova-categoria").value;

  const res = await fetch("/tag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });

  if (res.ok) {
    Swal.fire("Sucesso", "Categoria criada!", "success");
    carregarCategorias();
  } else {
    Swal.fire("Erro", "Não foi possível criar categoria", "error");
  }
}

