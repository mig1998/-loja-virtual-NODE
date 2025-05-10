

// Função para listar usuários
async function listUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();

  const usersListDiv = document.getElementById('users-list');
  usersListDiv.innerHTML = users.map(user => 
    `<div><strong>${user.name}</strong> - ${user.email}</div>`
  ).join('');
}

// Função para criar usuário
async function createUser(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  const newUser = await response.json();
  alert(`Usuário ${newUser.name} criado com sucesso!`);
  listUsers();  // Atualiza a lista de usuários
}

// Adiciona o evento do formulário
document.getElementById('create-user-form').addEventListener('submit', createUser);

// Inicializa a lista de usuários ao carregar a página
window.onload = listUsers;




