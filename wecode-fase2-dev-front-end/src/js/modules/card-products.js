import { getProducts } from './produtos.js';

export function initCardProducts() {
    document.addEventListener('DOMContentLoaded', () => {
        const section = document.getElementById('productSection');

        getProducts().then(products => {
            let htmlContent = '';

            products.forEach(product => {
                if (product.id === 2) {
                    htmlContent += `
                        <div class="product-card" id="product-${product.id}">
                            <div class="container-image-card">
                                <img src="${product.image}" alt="${product.name}" />
                                <img class="products-icon-fav" id="fav-${product.id}" src="../../public/botao-favoritos.svg" alt="" />
                                <img class="products-icon-bag" src="../../public/bag-icon.svg" alt="" />
                                <span class="span-item2" contenteditable="true">15% OFF</span>
                            </div>
                            <h2>${product.name}</h2>
                            <div class="card-prices">
                                ${product.price.isDiscount ? `<p class="discount-price">R$ ${product.price.isDiscount.toFixed(2).replace('.', ',')}</p>` : ''}
                                <p class="price-product">R$ ${product.price.amount.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                    `;
                } else if (product.id === 3) {
                    htmlContent += `
                        <div class="product-card" id="product-${product.id}">
                            <div class="container-image-card">
                                <img src="${product.image}" alt="${product.name}" />
                                <img class="products-icon-fav" id="fav-${product.id}" src="../../public/botao-favoritos.svg" alt="" />
                                <img class="products-icon-bag" src="../../public/bag-icon.svg" alt="" />
                                <span class="span-item3" contenteditable="true">10% OFF</span>
                            </div>
                            <h2>${product.name}</h2>
                            <div class="card-prices">
                                ${product.price.isDiscount ? `<p class="discount-price">R$ ${product.price.isDiscount.toFixed(2).replace('.', ',')}</p>` : ''}
                                <p class="price-product">R$ ${product.price.amount.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                    `;
                } else {
                    htmlContent += `
                        <div class="product-card" id="product-${product.id}">
                            <div class="container-image-card">
                                <img src="${product.image}" alt="${product.name}" />
                                <img class="products-icon-fav" id="fav-${product.id}" src="../../public/botao-favoritos.svg" alt="" />
                                <img class="products-icon-bag" src="../../public/bag-icon.svg" alt="" />
                            </div>
                            <h2>${product.name}</h2>
                            <div class="card-prices">
                                ${product.price.isDiscount ? `<p class="discount-price">R$ ${product.price.isDiscount.toFixed(2).replace('.', ',')}</p>` : ''}
                                <p class="price-product">R$ ${product.price.amount.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                    `;
                }
            });

            section.innerHTML = htmlContent;

            products.forEach(product => {
                const favIcon = document.getElementById(`fav-${product.id}`);
                favIcon.addEventListener('click', () => {
                    if (favIcon.src.endsWith('botao-favoritos.svg')) {
                        favIcon.src = '../../public/botao-favoritos-preenchido.svg';
                    } else {
                        favIcon.src = '../../public/botao-favoritos.svg';
                    }
                });
            });
        }).catch(error => {
            console.log('Produtoszada não encontrados:', error);
        });
    });
}