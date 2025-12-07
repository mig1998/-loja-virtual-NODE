document.getElementById("image").addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const preview = document.getElementById("image-preview");
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block"; // aparece
    }
});