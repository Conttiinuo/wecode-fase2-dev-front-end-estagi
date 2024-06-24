export function initFixaMenu() {
    // Func para fixar o menu // alterando estilos
    window.addEventListener('scroll', fixaMenu);

    const menu = document.querySelectorAll('.menu-flex');
    const produtos = document.querySelector('[data-dropdown]');
    const dropdownMenu = document.querySelector('.dropdown-menu')
    const logo = document.getElementById('logo-branca-principal');
    const iconeBusca = document.getElementById('icone-busca');
    const iconeConta = document.getElementById('icone-conta');
    const iconeSacola = document.getElementById('icone-sacola');

    let menuFixed = false;
    let productsClicked = false;

    function fixaMenu() {
        const scrollTop = window.pageYOffset + 1;

        menu.forEach((menu) => {
            const container = menu.parentElement;
            const containerTop = container.offsetTop + 5;

            if (scrollTop >= containerTop) {
                if (!menuFixed) {
                    menu.classList.add('menu-fixado');
                    menuFixed = true;
                    updateIcons();
                }
            } else {
                if (menuFixed) {
                    menu.classList.remove('menu-fixado');
                    menuFixed = false;
                    updateIcons();
                }
            }
        });
    }

    function updateIcons() {
        if (menuFixed || productsHoverade) {
            logo.setAttribute('src', '../../public/logo-preto.svg');
            iconeBusca.setAttribute('src', '../../public/search-icon.svg');
            iconeConta.setAttribute('src', '../../public/account-black-icon.svg');
            iconeSacola.setAttribute('src', '../../public/shopping-black-bag.svg');
        } else if (!menuFixed || productsClicked) {
            logo.setAttribute('src', '../../public/logo-branco.svg');
            iconeBusca.setAttribute('src', '../../public/icone-search-branco.svg');
            iconeConta.setAttribute('src', '../../public/icone-conta.svg');
            iconeSacola.setAttribute('src', '../../public/shopping-bag1-branco.svg');
        }
    }

    let productsHoverade = false;

    produtos.addEventListener('click', handleClickMenu);

    function handleClickMenu() {
        productsClicked = !productsClicked;
        menu.forEach((menu) => {
            menu.classList.toggle('produtos-hover');
            produtos.classList.toggle('dropdown-cat-menu');
            dropdownMenu.classList.toggle('active');
        });
        if (productsClicked) {
            logo.setAttribute('src', '../../public/logo-preto.svg');
            iconeBusca.setAttribute('src', '../../public/search-icon.svg');
            iconeConta.setAttribute('src', '../../public/account-black-icon.svg');
            iconeSacola.setAttribute('src', '../../public/shopping-black-bag.svg');
        } else if (!menuFixed || productsClicked) {
            logo.setAttribute('src', '../../public/logo-branco.svg');
            iconeBusca.setAttribute('src', '../../public/icone-search-branco.svg');
            iconeConta.setAttribute('src', '../../public/icone-conta.svg');
            iconeSacola.setAttribute('src', '../../public/shopping-bag1-branco.svg');
        }
    }
    fixaMenu();

    document.addEventListener('DOMContentLoaded', () => {
        const outletLink = document.querySelector('a[href="#outlet"]');

        outletLink.addEventListener('click', (event) => {
            event.preventDefault();

            const outletSection = document.getElementById('outlet');

            const offset = 110;
            const elementPosition = outletSection.offsetTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const lancamentoLink = document.querySelector('a[href="#lancamento"]');

        lancamentoLink.addEventListener('click', (event) => {
            event.preventDefault();

            const outletSection = document.getElementById('lancamento');

            const offset = 160;
            const elementPosition = outletSection.offsetTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}