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



async function createProduto(event) {
  event.preventDefault();

  const form = document.getElementById("create-user-form");
  const formData = new FormData(form);   // ← já pega tudo: text + file

  const response = await fetch("/users", {
      method: "POST",
      body: formData,
      credentials: "include"
  });

  const newUser = await response.json();
// console.log(newProduto)
  alert(`Usuário ${newUser.name} criado com sucesso!`);
  form.reset();
}




// Adiciona o evento do formulário
document.getElementById('create-user-form').addEventListener('submit', createProduto);
