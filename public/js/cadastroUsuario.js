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

  const btn = document.getElementById("btn-submit-user");
  let timer = 60; // segundos

  // DESABILITA O BOTÃO
  btn.disabled = true;
  btn.style.opacity = "0.5";
  btn.textContent = `Aguarde (${timer})...`;

  const interval = setInterval(() => {
      timer--;
      btn.textContent = `Aguarde (${timer})...`;

      if (timer <= 0) {
          clearInterval(interval);
          btn.disabled = false;
          btn.style.opacity = "1";
          btn.textContent = "Criar Usuário";
      }
  }, 1000);

  try {
      const form = document.getElementById("create-user-form");
      const formData = new FormData(form);

      const response = await fetch("/users", {
          method: "POST",
          body: formData,
          credentials: "include"
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Erro ao criar usuário");
      }

      const newUser = await response.json();

      Swal.fire({
          title: "Sucesso!",
          text: `Usuário ${newUser.name} criado com sucesso!`,
          icon: "success",
          confirmButtonText: "OK"
      }).then(() => {
          window.location.href = "/login";
      });

      form.reset();
      document.getElementById("user-photo-preview").style.backgroundImage = "";

  } catch (err) {
      Swal.fire({
          title: "Erro!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK"
      });
  }
}

// Preview da imagem
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

document.getElementById("create-user-form").addEventListener("submit", createUser);