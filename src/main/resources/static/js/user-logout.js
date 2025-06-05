document.addEventListener('DOMContentLoaded', async function() {

    document.getElementById('logoutButton').addEventListener('click', async function () {
        fetch('/user/logout', {
            method: 'POST',

            // Permite enviar e receber cookies
            credentials: 'include'

        })
            .then(response => {
                if (response.ok) {
                    showAlert('Logout realizado com sucesso! Redirecionando...');

                    // Redireciona para home
                    setTimeout(() => window.location.href = '/buscameds/home', 2000);
                } else {
                    alert('Erro ao fazer logout!');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
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