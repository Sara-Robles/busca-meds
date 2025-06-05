document.addEventListener('DOMContentLoaded', async function() {

    // LOGIN
    document.getElementById('loginButton').addEventListener('click', async function () {

        // Atribui os valores dos inputs nas variáveis
        const username = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        try {
            fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                // Permite enviar e receber cookies
                credentials: 'include',

                // JSON a ser passado para o back-end
                body: JSON.stringify({email: username, password: password})
            })
                .then(response => {
                    if (response.ok) {
                        showAlert('Login bem-sucedido! Redirecionando...', 'info');

                        // Oculta página de login
                        document.getElementById('loginLink').classList.add('d-none');

                        // Redirecionar para favoritos
                        setTimeout(() => window.location.href = '/buscameds/favorites', 2000);

                    } else {
                        showAlert('Usuário ou senha inválidos', 'error');

                    }
                })
        } catch (error) {
            console.error('Erro na requisição:',error);
        }

    });

    // CRIAR NOVA CONTA
    document.getElementById('registerPageButton').addEventListener('click', async function () {
        window.location.href = '/buscameds/user/registration';
    });

    // APRESENTA ALERTA
    function showAlert(message, type) {
        if(type === 'error') {
            const errorElement = document.getElementById('errorMessage');
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
            setTimeout(() => hideAlert(), 2000);
        } else if (type === 'info') {
            const infoMessage = document.getElementById('infoMessage');
            infoMessage.textContent = message;
            infoMessage.classList.remove('d-none');
            setTimeout(() => hideAlert(), 2000);
        }
    }

    // ESCONDE ALERTAS
    function hideAlert() {
        const errorElement = document.getElementById('errorMessage');
        const infoElement = document.getElementById('infoMessage')

        if (errorElement) {
            errorElement.classList.add('d-none');
        }

        if (infoElement) {
            infoElement.classList.add('d-none');
        }

    }

});