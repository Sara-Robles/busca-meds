// CADASTRAR NOVO USUÁRIO
document.getElementById('registerButton').addEventListener('click', async function(){

    // Atribui os valores dos inputs nas variáveis
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    fetch('/user/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Permite enviar e receber cookies
        credentials: 'include',

        // JSON a ser passado para o back-end
        body: JSON.stringify({ name: name, email: email, password: password })
    })
        .then(response => {
            if (response.ok) {
                alert('Cadastro bem-sucedido!');

                // Redirecionar para login
                window.location.href = '/user-login.html';

            } else {
                alert('Não foi possível realizar o cadastro!');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
});