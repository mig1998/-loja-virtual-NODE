document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();  // Impede o envio do formulário padrão

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };  // Cria um objeto com os dados de login

  // Envia uma requisição POST para o servidor
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  // Define o tipo do conteúdo como JSON
    },
    body: JSON.stringify(data)  // Converte o objeto para JSON
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Login bem-sucedido!") {
        // Redireciona para o home ou página principal
        window.location.href = "/usuarios";  // Alterar para a página que deseja
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
