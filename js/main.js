// Лайтбокс для картинок
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery img");
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    document.body.appendChild(lightbox);

    const img = document.createElement("img");
    lightbox.appendChild(img);

    // При клике на картинку открываем лайтбокс
    images.forEach(image => {
        image.addEventListener("click", () => {
            img.src = image.src;
            lightbox.style.display = "flex";
        });
    });

    // При клике на фон закрываем лайтбокс
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});
