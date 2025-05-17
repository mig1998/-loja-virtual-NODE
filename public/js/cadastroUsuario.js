
// Função para criar usuário

async function createUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;


    const data = { name, email, senha };

    const response = await fetch("/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const newUser = await response.json();
    alert(`Usuário ${newUser.name} criado com sucesso!`);
    event.target.reset();
    // listUsers();  // Atualiza a lista de usuários
}




// Adiciona o evento do formulário
document.getElementById('create-user-form').addEventListener('submit', createUser);
