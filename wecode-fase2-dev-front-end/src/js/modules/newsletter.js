export function initNewsletter() {
    document.addEventListener('DOMContentLoaded', () => {
        const emailInput = document.getElementById('email-input');
        const sendBtn = document.getElementById('botao-enviar');
        const newsletterDiv = document.querySelector('.infos-newsletter');
        const salvaEmail = localStorage.getItem('newsletterEmail');
        const newsletterBody = document.querySelector('.newsletter-body p');

        if (salvaEmail) {
            mostrarCupom();
        }

        emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            if (validaEmail(email)) {
                sendBtn.disabled = false;
            } else {
                sendBtn.disabled = true;
            }
        });

        sendBtn.addEventListener('click', () => {
            const email = emailInput.value;
            if (validaEmail(email)) {
                localStorage.setItem('newsletterEmail', email);
                mostrarCupom();
            }
        });

        function validaEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }


        function mostrarCupom() {
            newsletterDiv.innerHTML = `
                <div class="copia">
                    <input class="input-bemvinda" type="text" value="BEMVINDA" readonly>
                    <button class="botao-enviado" id="copy-button">Copiar</button>
                </div>
            `;

            newsletterBody.innerHTML = `
                <p class="cadast-alternativo">Utilize o cupom ao lado e garanta seu desconto!</p>
            `

            const copyButton = document.getElementById('copy-button');
            const couponInput = newsletterDiv.querySelector('input');

            copyButton.addEventListener('click', () => {
                couponInput.select();
                document.execCommand('copy');
                copyButton.textContent = 'Copiado';
            });
        }
    });
}