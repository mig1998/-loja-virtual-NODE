async function logout() {
    const res = await fetch('/users/logout', { method: 'POST' });
    if (res.ok) {
        window.location.href = "/login";
    } else {
        alert("Erro ao sair");
    }
}

export { logout };