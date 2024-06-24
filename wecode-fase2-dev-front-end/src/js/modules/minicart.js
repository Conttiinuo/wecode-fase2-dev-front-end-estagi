import { getProducts } from './produtos.js';

export function initCardProducts() {
    document.addEventListener('DOMContentLoaded', () => {
        const section = document.getElementById('productSection');

        getProducts().then(products => {
            let htmlContent = '';

            products.forEach(product => {
                htmlContent += `
                    <div class="product-card" id="product-${product.id}">
                        <div class="container-image-card">
                            <img src="${product.image}" alt="${product.name}" />
                            <img class="products-icon-fav" src="../../public/botao-favoritos.svg" alt="" />
                            <img class="products-icon-bag" src="../../public/bag-icon.svg" alt="" />
                        </div>
                        <h2>${product.name}</h2>
                        <div class="card-prices">
                            ${product.price.isDiscount ? `<p class="discount-price">R$ ${product.price.isDiscount.toFixed(2).replace('.', ',')}</p>` : ''}
                            <p class="price-product">R$ ${product.price.amount.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </div>
                `;
            });

            section.innerHTML = htmlContent;
            initShowMinicart(); // Inicializar os eventos do minicart após adicionar os produtos
        }).catch(error => {
            console.log('Produtos não encontrados:', error);
        });
    });
}

export function initShowMinicart() {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.products-icon-bag').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const productId = event.target.closest('.product-card').id.split('-')[1];
                selectionModal(productId);
            });
        });

        document.querySelector('.carrinho-header').addEventListener('click', () => {
            const minicart = document.getElementById('minicart');
            minicart.classList.add('open');
            updateMinicart(); // Certifica-se de atualizar o minicart ao abrir
        });
    });

    function selectionModal(productId) {
        const modal = document.getElementById('sizeSelectionModal');
        const productImage = document.getElementById(`product-${productId}`).querySelector('img').src;
        const productName = document.getElementById(`product-${productId}`).querySelector('h2').textContent;
        modal.querySelector('.modal-image').src = productImage;
        modal.querySelector('.modal-product-name').textContent = productName;
        modal.style.display = 'block';
        modal.dataset.productId = productId;

    }

    let cart = [];

    function addToCart(productId, size) {
        getProducts().then(products => {
            const product = products.find(p => p.id == productId);
            const existingProductIndex = cart.findIndex(p => p.id == productId && p.size == size);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ ...product, size, quantity: 1 });
            }

            updateMinicart();
        });
    }

    function removeFromCart(productId, size) {
        cart = cart.filter(product => !(product.id == productId && product.size == size));
        updateMinicart();
    }

    function changeQuantity(productId, size, change) {
        const productIndex = cart.findIndex(p => p.id == productId && p.size == size);
        if (productIndex > -1) {
            cart[productIndex].quantity += change;
            if (cart[productIndex].quantity <= 0) {
                cart.splice(productIndex, 1);
            }
        }
        updateMinicart();
    }

    document.getElementById('addToCartButton').addEventListener('click', () => {
        const productId = document.getElementById('sizeSelectionModal').dataset.productId;
        const selectedSize = document.querySelector('input[name="size"]:checked').value;

        addToCart(productId, selectedSize);

        document.getElementById('sizeSelectionModal').style.display = 'none';
    });

    function updateMinicart() {
        const minicart = document.getElementById('minicart');
        minicart.classList.add('open');
        const subtotal = cart.reduce((sum, product) => sum + (product.price.amount * product.quantity), 0);
        const discounts = cart.reduce((sum, product) => sum + ((product.price.isDiscount ? (product.price.amount - product.price.isDiscount) : 0) * product.quantity), 0);
        const total = subtotal - discounts;

        let cartHTML = `
            <span class="close-button-minicart" onclick="document.getElementById('minicart').classList.remove('open')">&times;</span>
            <div class="header-carrinho">
                <img id="icone-sacola" src="../../public/shopping-bag1-branco.svg" alt="icone sacola de compras">
                <h3>Carrinho</h3>
            </div>
            <div class="cart-items-container">
        `;

        if (cart.length === 0) {
            cartHTML += `
                <div class="carrinho-vazio">
                    <img src="../../public/shopping-black-bag.svg" alt="icone sacola vazia">
                    <p>Putz... Seu carrinho está vazio!</p>
                </div>
            `;
        } else {
            cart.forEach(product => {
                cartHTML += `
                    <div class="carrinho-itens">
                        <div class="container-infos"> 
                            <div class="product-carrinho">
                                <img src="${product.image}" alt="${product.name}" />
                            </div>
                            <div class="info-carrinho">
                                <p class="produto-nome">${product.name}</p>
                                <p class="produto-size">Tamanho: ${product.size}</p>
                                <p class="produto-price">R$ ${product.price.amount.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                        <div class="actions-carrinho">
                            <p class="quantity-custom">
                                <button class="quantity-button" onclick="changeQuantity(${product.id}, '${product.size}', -1)">-</button>
                                ${product.quantity}
                                <button class="quantity-button" onclick="changeQuantity(${product.id}, '${product.size}', 1)">+</button>
                            </p>
                            <button class="remove-button" onclick="removeFromCart(${product.id}, '${product.size}')">Remover</button>
                        </div>
                    </div>
                `;
            });

            cartHTML += `
                </div>
                <div class="cart-summary">
                    <div class="cart-precos"> 
                        <p>Subtotal</p>
                        <p>R$ ${total.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="cart-precos">
                        <p>Descontos</p>
                        <p class="cart-preco-discount">R$ ${discounts.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="cart-precos">
                        <p>Total</p> 
                        <p>R$ ${subtotal.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button id="checkoutButton">Finalizar pedido</button>
                    <span class="keep-comprando" onclick="document.getElementById('minicart').classList.remove('open')">Continuar comprando</span>
                </div>
            `;
        }

        function closeMinicart(event) {
            event.preventDefault();

            const minicart = document.getElementById('minicart');
            minicart.classList.remove('open');
        }

        minicart.innerHTML = cartHTML;

        document.querySelector('.carrinho-header p').textContent = cart.reduce((sum, product) => sum + product.quantity, 0);
    }

    window.changeQuantity = changeQuantity;
    window.removeFromCart = removeFromCart;
}