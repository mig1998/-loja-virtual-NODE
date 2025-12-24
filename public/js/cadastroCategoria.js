async function carregarCategorias() {
  const res = await fetch("/tag");
  const categorias = await res.json();

  
  const div = document.getElementById("categoria-list") 

  div.innerHTML = categorias.map(c => `
  <div id="cat-${c._id}" style="margin-bottom:12px;">
    
    <span id="cat-name-${c._id}">
      <h2>${c.name}</h2>
    </span>

 <button onclick="mostrarEditarCategoria('${c._id}', '${c.name}')">✏️</button>
  <button onclick="deleteCategoria('${c._id}')">🗑️</button>

  </div>
`).join("");
  
}

carregarCategorias();


function mostrarEditarCategoria(id, nomeAtual) {
  const container = document.getElementById(`cat-${id}`);

  container.innerHTML = `
    <input 
      type="text" 
      id="edit-cat-${id}" 
      value="${nomeAtual}"
    />

    <button onclick="salvarCategoria('${id}')">Salvar</button>
    <button onclick="carregarCategorias()">Cancelar</button>
  `;
}


async function criarCategoria() {
  const name = document.getElementById("nova-categoria").value;

  const res = await fetch("/tag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  if (res.ok) {
    Swal.fire("Sucesso", "Categoria criada!", "success");
    carregarCategorias();
  } else {
    Swal.fire("Erro", "Não foi possível criar categoria", "error");
  }
}


async function salvarCategoria(id) {
  const input = document.getElementById(`edit-cat-${id}`);
  const novoNome = input.value.trim();

  if (!novoNome) {
    alert("O nome não pode ficar vazio");
    return;
  }

  const res = await fetch(`/tag/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: novoNome })
  });

  if (res.ok) {
    carregarCategorias();
  } else {
    alert("Erro ao atualizar categoria");
  }
}


// ---------- DELETE ----------
async function deleteCategoria(id) {
  const result = await Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá desfazer isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não"
  });
  
  
  if (result.isConfirmed) {
  await fetch(`/tag/${id}`, { method: "DELETE" });
  window.location.reload();
  }
}

