document.addEventListener('DOMContentLoaded', async function() {

    document.getElementById('logoutButton').addEventListener('click', async function () {
        fetch('/user/logout', {
            method: 'POST',

            // Permite enviar e receber cookies
            credentials: 'include'

        })
            .then(response => {
                if (response.ok) {
                    alert('Logout realizado com sucesso!');

                    // Redireciona para home
                    window.location.href = '/buscameds/home';
                } else {
                    alert('Erro ao fazer logout!');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
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