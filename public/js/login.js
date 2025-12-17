document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();  // Impede o envio do formulário padrão

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = { email, senha };  // Cria um objeto com os dados de login

  // Envia uma requisição POST para o servidor
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  // Define o tipo do conteúdo como JSON
    },
    body: JSON.stringify(data)  // Converte o objeto para JSON
  })
    .then(response => {
      console.log("Resposta bruta:", response); // 👈 Mostra a resposta recebida
      return response.json(); // Tenta converter
    })
    .then(data => {
      if (data.message === "Login bem-sucedido!") {
        // Redireciona para o home ou página principal
        window.location.href = "/";  // Alterar para a página que deseja
      } else {
        // Exibe mensagem de erro se o login falhar
        document.getElementById("error-message").textContent = data.message;
      }
    })
    .catch(error => {
      console.log("Erro:", error);
      document.getElementById("error-message").textContent = "Ocorreu um erro. Tente novamente.";
    });
});

