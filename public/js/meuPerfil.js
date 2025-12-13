
import { logout } from "./logout.js";


console.log("Edit user JS carregado");

// PREVIEW DA IMAGEM
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


// ---------- CARREGAR DADOS DO USUÁRIO LOGADO ----------
async function carregarUsuarioLogado(){
    try {
        const res =await fetch("/users/perfil"); // você deve ter essa rota
        
        const user = await res.json();

        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("senha").value = user.senha;
        // FOTO
        preview.style.backgroundImage = `url('${user.image || ""}')`;

        // Guarda ID para atualizar depois
        window.USER_ID = user._id;

        console.log("Usuário carregado:", user);

    } catch (err) {
        console.log("Erro ao carregar usuário", err);
    }

}


carregarUsuarioLogado();
// ---------- ATUALIZAR USUÁRIO (FORMDATA) ----------
async function updateUser(event) {
    event.preventDefault();

    const btn = document.getElementById("btn-submit-user");
    let timer = 60;

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
        const form = document.getElementById("editMeuPerfil-user-form");
        const formData = new FormData(form);

        const response = await fetch(`/users/${window.USER_ID}`, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erro ao atualizar usuário");
        }

        const updated = await response.json();

        Swal.fire({
            title: "Atualizado!",
            text: `Usuário ${updated.name} atualizado com sucesso!`,
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
         logout();
            window.location.href="/login"
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
document.getElementById("editMeuPerfil-user-form").addEventListener("submit", updateUser);

// ao carregar página
//window.onload = carregarUsuarioLogado();