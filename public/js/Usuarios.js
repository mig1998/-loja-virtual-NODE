// Função para listar usuários
async function listUsers() {
  const response = await fetch("users");
  const users = await response.json();

  const div = document.getElementById("users-list");
  div.innerHTML = users.map(u =>
    `<div data-id="${u.id}">
       <h2>${u.name}</h2> <h2>email:</h2> <p>${u.email}</p> <h2>tipo:</h2> <p>${u.type}</p>
       <button onclick="editUser('${u._id}')">✏️</button>
       <button onclick="deleteUser('${u._id}')">🗑️</button>
     </div>`).join("");
}





// Inicializa a lista de usuários ao carregar a página
window.onload = listUsers;



// ---------- UPDATE ----------
function editUser(id) {             // abre prompt simples
  fetch(`${"/users"}/${id}`)
    .then(r => r.json())
    .then(u => {
      const name = prompt("Novo nome:", u.name);
      const email = prompt("Novo email:", u.email);
      const senha = prompt("Nova Senha:", u.senha);
      const type = prompt("tipo usuario :", u.type);
      if (name && email) updateUser(id, { name, email, senha, type });

        console.log(name, email, senha, type);
    });
  
   
}


async function updateUser(id, data) {
  await fetch(`${"/users"}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  listUsers();
}




// ---------- DELETE ----------
async function deleteUser(id) {
  if (!confirm("Deseja excluir?")) return;
  await fetch(`${"/users"}/${id}`, { method: "DELETE" });
  listUsers();
}

async function buscarPorId() {
  const id = document.getElementById('search-id').value;


  
  const user = await getUserById(id);
  const div = document.getElementById('result-id');
  if (user) {
    div.innerHTML = `<p><strong>ID:</strong> ${user.id} <br> <strong>Nome:</strong> ${user.name} <br> <strong>Email:</strong> ${user.email}</p>`;
  } else {
    div.innerHTML = `<p>Nenhum usuário encontrado com ID ${id}</p>`;
  }
}

// Função para buscar por nome e mostrar resultados
async function buscarPorNome() {
  const nome = document.getElementById('search-name').value.trim();
  if (!nome) {
    alert('Digite um nome para buscar');
    return;
  }
  const users = await getUsersByName(nome);
  const div = document.getElementById('result-name');
  if (users.length === 0) {
    div.innerHTML = `<p>Nenhum usuário encontrado com nome "${nome}"</p>`;
  } else {
    div.innerHTML = users.map(u =>
      `<div>
            <strong>ID:</strong> ${u._id} <br>
            <strong>Nome:</strong> ${u.name} <br>
            <strong>Email:</strong> ${u.email}
          </div><hr>`
    ).join('');
  }
}

// Suas funções originais para buscar dados via fetch:
async function getUserById(id) {
  const res = await fetch(`/users/${id}`);
  return res.ok ? res.json() : null;
}

async function getUsersByName(name) {
  const res = await fetch(`/users/name/${encodeURIComponent(name)}`);
  return res.ok ? res.json() : [];
}