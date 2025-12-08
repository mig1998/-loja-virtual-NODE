// Função global para evitar envios duplicados
document.addEventListener("DOMContentLoaded", () => {

    // intercepta TODOS os formulários do site
    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", function (event) {
            const submitBtn = form.querySelector("button[type='submit'], input[type='submit']");
            if (!submitBtn) return;

            // desabilita botão
            submitBtn.disabled = true;

            // texto original
            const originalText = submitBtn.innerHTML || submitBtn.value;

            // timer visual (5s)
            let time = 5;
            submitBtn.innerHTML = `Aguarde (${time})...`;

            const interval = setInterval(() => {
                time--;
                submitBtn.innerHTML = `Aguarde (${time})...`;
                if (time <= 0) clearInterval(interval);
            }, 1000);

            // reativação automática após 5 segundos
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 5000);
        });
    });

});