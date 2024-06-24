import { initFixaMenu } from "./fixaMenu.js";

export function initProductsMenu() {
    const menuProducts = document.querySelectorAll('.dropdown-menu-produtos li a');
    const imageContainer = document.getElementById('image-products-container');
    const img = document.createElement('img');
    imageContainer.appendChild(img);

    menuProducts.forEach((item) => {
        item.addEventListener('mouseover', (event) => {
            const imgSrc = event.target.getAttribute('data-img-src');
            if (imgSrc) {
                img.src = imgSrc;
                img.classList.add('active');
            }
        });

        item.addEventListener('mouseout', () => {
            img.classList.remove('active');
        });
    });
}
