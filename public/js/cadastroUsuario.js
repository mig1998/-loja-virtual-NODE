// Função para criar usuário

/*
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
*/


async function createUser(event) {
  event.preventDefault();

  const form = document.getElementById("create-user-form");
  const formData = new FormData(form);

  try {

    const response = await fetch("/users", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    // Se o backend retornar erro (status 400, 500, etc)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));

      return Swal.fire({
        title: "Erro!",
        text: errorData.message || "Não foi possível criar o usuário.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }

    // Sucesso
    const newUser = await response.json();

    Swal.fire({
      title: 'Sucesso!',
      text: `Usuário ${newUser.name} criado com sucesso!`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "/login";
    });

    form.reset();

  } catch (error) {
    // Erros de rede, servidor offline, path errado, etc
    Swal.fire({
      title: "Erro!",
      text: "Ocorreu um erro de conexão. Tente novamente.",
      icon: "error",
      confirmButtonText: "OK"
    });
  }
}


const fileInput = document.getElementById("user-image-input");
const preview = document.getElementById("user-photo-preview");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        preview.style.backgroundImage = `url('${reader.result}')`;
    };
    reader.readAsDataURL(file);
});


// Adiciona o evento do formulário
document.getElementById('create-user-form').addEventListener('submit', createUser);
