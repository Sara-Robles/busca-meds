document.addEventListener('DOMContentLoaded', async function() {

    // LOGIN
    document.getElementById('loginButton').addEventListener('click', async function () {

        // Atribui os valores dos inputs nas variáveis
        const username = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

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
                    alert('Login bem-sucedido!');

                    // Oculta página de login
                    document.getElementById('loginLink').classList.add('d-none');

                    // Redirecionar para favoritos
                    window.location.href = '/buscameds/favorites';


                } else {
                    alert('Usuário ou senha inválidos');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    });

    // CRIAR NOVA CONTA
    document.getElementById('registerPageButton').addEventListener('click', async function () {
        window.location.href = '/buscameds/user/registration';
    });

    function showError(message) {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
        }
    }

    function hideError() {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.classList.add('d-none');
        }
    }

});