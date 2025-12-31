// PEGAR ID DA URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// PREVIEW DA IMAGEM NOVA
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




async function carregarCategorias() {
  const res = await fetch("/tag");
  const categorias = await res.json();

  const select = document.getElementById("categoria");

  select.innerHTML = categorias.map(c => `
    <option value="${c.name}">${c.name}</option>
  `).join("");
}

carregarCategorias();


// CARREGAR PRODUTO EXISTENTE
async function carregarDadosProduto() {
    try {
        const res = await fetch(`/products/${id}`);
        const produto = await res.json();

        document.getElementById("name").value = produto.name;
        document.getElementById("description").value = produto.description;
        document.getElementById("price").value = produto.price;
        document.getElementById("quantidade").value = produto.quantidade;
        document.getElementById("categoria").value = produto.categoria;





        // PREVIEW DA IMAGEM EXISTENTE
        const preview = document.getElementById("produto-preview");
        const empty = document.getElementById("empty-produto");

        if (produto.image) {
            preview.src = produto.image;
            preview.style.display = "block";
            empty.style.display = "none";
        }

        

    } catch (err) {
        console.error("Erro ao carregar produto:", err);
    }
}



carregarDadosProduto();
// ---------- ATUALIZAR USUÁRIO (FORMDATA) ----------
async function updateProduto(event) {
    event.preventDefault();

    const btn = document.getElementById("btn-submit-produto");
    let timer = 10;

    // desabilita botão
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
            btn.textContent = "Atualizar";
        }
    }, 1000);

    try {
        const form = document.getElementById("edit-produto-form");
        const formData = new FormData(form);

        const response = await fetch(`/products/${id}`, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro ao atualizar produto");
        }

        const updated = await response.json();

        Swal.fire({
            title: "Atualizado!",
            text: `Produto ${updated.name} atualizado com sucesso!`,
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href="/"
        });

    } catch (err) {
        Swal.fire({
            title: "Erro!",
            text: err.message,
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}


// eventos
document.getElementById("edit-produto-form").addEventListener("submit", updateProduto);

// ao carregar página
//window.onload = carregarUsuarioLogado();