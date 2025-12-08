// Função para criar produto

/*
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
*/

async function createProduto(event) {
    event.preventDefault();

    const btn = document.getElementById("btn-submit-produto");
    let timer = 5;

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
            btn.textContent = "Criar Produto";
        }
    }, 1000);

    try {
        const form = document.getElementById("create-produto-form");
        const formData = new FormData(form);

        const response = await fetch("/products", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Erro ao cadastrar produto");
        }

        Swal.fire({
            title: "Sucesso!",
            text: `Produto ${result.name} criado com sucesso!`,
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "/meusProdutos";
        });

        form.reset();
        document.getElementById("produto-preview").style.backgroundImage = "";

    } catch (err) {
        Swal.fire({
            title: "Erro!",
            text: err.message,
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}


// Adiciona o evento do formulário
document.getElementById('create-produto-form').addEventListener('submit', createProduto);





document.getElementById("produto-image").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("produto-preview");
    const empty = document.getElementById("empty-produto");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
        empty.style.display = "none";
    }
});