// Função para criar produto
async function createProduto(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const categoria = document.getElementById('categoria').value;


    const data = { name, description, image, price, categoria };

    const response = await fetch("/products", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include", // ← importante para enviar cookie da sessão
        body: JSON.stringify(data),
    })

    const newProduto = await response.json();
    console.log(newProduto.name);
    alert(`produto ${newProduto.name} criado com sucesso!`);
    event.target.reset();

}

// Adiciona o evento do formulário
document.getElementById('create-produto-form').addEventListener('submit', createProduto);
