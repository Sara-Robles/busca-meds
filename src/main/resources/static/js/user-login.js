// Realizar Login
document.getElementById('loginButton').addEventListener('click', async function(){

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
        body: JSON.stringify({ email: username, password: password })
    })
        .then(response => {
            if (response.ok) {
                alert('Login bem-sucedido!');

                // Redirecionar para favoritos
                window.location.href = '/favorites.html';

            } else {
                alert('Usuário ou senha inválidos');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
});

// Redirecionar para Cadastro
document.getElementById('registerPageButton').addEventListener('click', async function(){
    window.location.href = '/user-registration.html';
});



