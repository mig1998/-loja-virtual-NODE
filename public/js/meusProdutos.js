async function listarMeusProdutos() {
  const res = await fetch("/products/user/produtos");

  if (!res.ok) {
    alert("Você precisa estar logado para ver seus produtos.");
    return;
  }

  const resposta = await res.json();
  const div = document.getElementById("meus-produtos");


//console.log(resposta)
  if (resposta.length === 0) {
    div.innerHTML = "<p>Você ainda não cadastrou produtos.</p>";
    return;
  }

  div.innerHTML = resposta.produtos.map(p => `
    <div>
         <img src="${p.image}" class="foto-produto">  
     <h2>${p.name}</h2>  
     <h3>Descrição:</h3> <p>${p.description}</p>
        <h3>R$:${p.price}</h3>
       <button onclick="editProduto('${p._id}')">✏️</button>
       <button onclick="deleteProduto('${p._id}')">🗑️</button>
      Categoria: ${p.categoria}<hr>



    </div>
  `).join("");
}



async function getLoggedUserType() {
  const res = await fetch('/products/user/produtos');
  if (res.ok) {
    const user = await res.json();
    console.log("tipo do usuário logado:", user.userType);
    return user;
  } else {
    console.warn("Usuário não logado");
    return null;
  }
}

window.onload = async () => {
  listarMeusProdutos();
//getLoggedUserType();
};

