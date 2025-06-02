document.getElementById('logoutButton').addEventListener('click', async function() {
    fetch('/user/logout', {
        method: 'POST',

        // Permite enviar e receber cookies
        credentials: 'include'

    })
        .then(response => {
            if (response.ok) {
                alert('Logout realizado com sucesso!');

                // Redireciona para home
                window.location.href = '/home';
            } else {
                alert('Erro ao fazer logout!');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
});